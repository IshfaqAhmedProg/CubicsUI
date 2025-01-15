import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import {
  Dependencies,
  LocalDependency,
  ExternalDependency,
} from "@cubicsui/db";

/**
 * TypeScript path mapping configuration from tsconfig.json
 * Example: { "@/*": ["./src/*"] }
 */
type TsConfigPaths = {
  [key: string]: string[];
};

/**
 * Determines if an import path refers to a node module (external dependency)
 * Handles both scoped (@org/pkg) and regular (lodash) packages
 *
 * @param importPath - The raw import path from the code
 * @param paths - TypeScript path mappings from tsconfig
 * @returns True if the import is a node module, false otherwise
 */
function isNodeModule(importPath: string, paths: TsConfigPaths): boolean {
  if (importPath.startsWith("@") && importPath.split("/").length > 1) {
    const [scope] = importPath.split("/");
    // Check if the scope matches any of our path aliases
    return !Object.keys(paths).some(
      (alias) => alias.startsWith(scope + "/") || alias === scope
    );
  }
  // If not starting with . or / and not matching any aliases, it's a node module
  return (
    !importPath.startsWith(".") &&
    !importPath.startsWith("/") &&
    !Object.keys(paths).some((alias) =>
      importPath.startsWith(alias.replace("/*", ""))
    )
  );
}

/**
 * Resolves an import path using TypeScript path aliases
 * Example: '@/components/Button' -> './src/components/Button'
 *
 * @param importPath - The raw import path from the code
 * @param paths - TypeScript path mappings from tsconfig
 * @returns The resolved path
 */
function resolveAliasedPath(importPath: string, paths: TsConfigPaths): string {
  if (isNodeModule(importPath, paths)) {
    return importPath;
  }

  // Normalize paths by removing trailing /* from patterns
  const normalizedPaths = Object.fromEntries(
    Object.entries(paths).map(([key, values]) => [
      key.replace(/\/\*$/, ""),
      values.map((v) => v.replace(/\/\*$/, "")),
    ])
  );

  for (const [alias, possiblePaths] of Object.entries(normalizedPaths)) {
    const normalizedAlias = alias.replace(/\/\*$/, "");
    if (importPath.startsWith(normalizedAlias)) {
      for (const possiblePath of possiblePaths) {
        const normalizedPossiblePath = possiblePath.replace(/\/\*$/, "");
        return importPath.replace(normalizedAlias, normalizedPossiblePath);
      }
    }
  }
  return importPath;
}

/**
 * Creates a new Ext Dependency object
 *
 * @param name - The name or path of the dependency
 * @returns A new Dependency object
 */
export function createExternalDependency(name: string): ExternalDependency {
  return {
    name,
    ver: "@latest",
    type: "normal",
  };
}
/**
 * Creates a new Ext Dependency object
 *
 * @param name - The name or path of the dependency
 * @returns A new Dependency object
 */
export function createLocalDependency(name: string): LocalDependency {
  return {
    name,
    cmpId: "",
  };
}

/**
 * Analyzes JavaScript/TypeScript code to extract its dependencies
 * Handles both ES modules (import) and CommonJS (require)
 * Supports TypeScript path aliases from tsconfig.json
 *
 * @param code - The source code to analyze
 * @param paths - TypeScript path mappings from tsconfig
 * @returns Object containing external and local dependencies
 */
export function analyzeCodeDependencies(
  code: string | undefined,
  paths: TsConfigPaths
): Dependencies {
  if (!code) {
    return { ext: [], lcl: [] };
  }

  const dependencies: Dependencies = {
    ext: [],
    lcl: [],
  };

  try {
    // Parse the code into an AST (Abstract Syntax Tree)
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["typescript", "jsx"],
    });

    // Process a single import statement or require call
    const processImport = (importSource: string) => {
      if (isNodeModule(importSource, paths)) {
        // For scoped packages, keep the full scope (@org/pkg)
        const packageName = importSource.split("/").slice(0, 2).join("/");
        const existingDep = dependencies.ext.find(
          (d) => d.name === packageName
        );
        if (!existingDep) {
          dependencies.ext.push(createExternalDependency(packageName));
        }
        return;
      }

      const resolvedPath = resolveAliasedPath(importSource, paths);
      // Check if it's a local module (starts with ./ or / or matches an alias)
      if (
        resolvedPath.startsWith(".") ||
        resolvedPath.startsWith("/") ||
        Object.keys(paths).some((alias) =>
          resolvedPath.startsWith(alias.replace("/*", ""))
        )
      ) {
        const existingDep = dependencies.lcl.find(
          (d) => d.name === resolvedPath
        );
        if (!existingDep) {
          dependencies.lcl.push(createLocalDependency(resolvedPath));
        }
      } else {
        const packageName = resolvedPath.split("/")[0];
        const existingDep = dependencies.ext.find(
          (d) => d.name === packageName
        );
        if (!existingDep) {
          dependencies.ext.push(createExternalDependency(packageName));
        }
      }
    };

    // Walk the AST looking for imports and requires
    traverse(ast, {
      // Handle ES module imports
      ImportDeclaration(path) {
        processImport(path.node.source.value);
      },
      // Handle CommonJS require calls
      CallExpression(path) {
        if (
          path.node.callee.type === "Identifier" &&
          path.node.callee.name === "require"
        ) {
          const arg = path.node.arguments[0];
          if (arg && arg.type === "StringLiteral") {
            processImport(arg.value);
          }
        }
      },
    });
  } catch (error) {
    console.error("Error analyzing dependencies:", error);
  }

  // Sort dependencies alphabetically by name
  return {
    ext: dependencies.ext.sort((a, b) => a.name.localeCompare(b.name)),
    lcl: dependencies.lcl.sort((a, b) => a.name.localeCompare(b.name)),
  };
}
