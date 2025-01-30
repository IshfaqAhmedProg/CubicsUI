"use server";
import * as parser from "@babel/parser";
import { recursive as walkRecursive } from "babel-walk";
import {
  Dependencies,
  LocalDependency,
  ExternalDependency,
} from "@cubicsui/db";
import { isNodeModule } from "./isNodeModule";

/**
 * TypeScript path mapping configuration from tsconfig.json
 * Example: { "@/*": ["./src/*"] }
 */
export type TsConfigPaths = {
  [key: string]: string[];
};

/**
 * Creates a new Ext Dependency object
 *
 * @param name - The name or path of the dependency
 * @returns A new Dependency object
 */
export async function createExternalDependency(
  name: string
): Promise<ExternalDependency> {
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
export async function createLocalDependency(
  name: string
): Promise<LocalDependency> {
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
export default async function dependencyAnalyser(
  code: string | undefined,
  paths: TsConfigPaths,
  outPath: string
): Promise<Dependencies> {
  const dependencies: Dependencies = {
    ext: [],
    lcl: [],
  };
  if (!code) {
    return dependencies;
  }

  try {
    // Parse the code into an Abstract Syntax Tree
    const ast = parser.parse(code, {
      sourceType: "module",
      // TODO add more plugins
      plugins: ["typescript", "jsx"],
    });

    // Process a single import statement or require call
    const processImport = async (importSource: string) => {
      if (isNodeModule(importSource, paths)) {
        // For scoped packages, keep the full scope (@org/pkg)
        const packageName = importSource.split("/").slice(0, 2).join("/");
        const existingDep = dependencies.ext.find(
          (d) => d.name === packageName
        );
        if (!existingDep) {
          dependencies.ext.push(await createExternalDependency(packageName));
        }
        return;
      }

      // Check if it's a local module (starts with ./ or / or matches an alias)
      if (
        importSource.startsWith(".") ||
        importSource.startsWith("/") ||
        Object.keys(paths).some((alias) =>
          importSource.startsWith(alias.replace("/*", ""))
        )
      ) {
        const existingDep = dependencies.lcl.find(
          (d) => d.name === importSource
        );
        if (!existingDep) {
          dependencies.lcl.push(await createLocalDependency(importSource));
        }
      } else {
        const packageName = importSource.split("/")[0];
        const existingDep = dependencies.ext.find(
          (d) => d.name === packageName
        );
        if (!existingDep) {
          dependencies.ext.push(await createExternalDependency(packageName));
        }
      }
    };

    const visitors = walkRecursive({
      // Handle ES module imports
      ImportDeclaration: (node) => {
        processImport(node.source.value);
      },
      // Handle CommonJS require calls
      CallExpression: (node) => {
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "require"
        ) {
          const arg = node.arguments[0];
          if (arg && arg.type === "StringLiteral") {
            processImport(arg.value);
          }
        }
      },
    });
    // Walk the AST looking for imports and requires
    visitors(ast);
  } catch (error) {
    console.error("Error analyzing dependencies:", error);
  }

  // Sort dependencies alphabetically by name
  return {
    ext: dependencies.ext.sort((a, b) => a.name.localeCompare(b.name)),
    lcl: dependencies.lcl.sort((a, b) => a.name.localeCompare(b.name)),
  };
}
