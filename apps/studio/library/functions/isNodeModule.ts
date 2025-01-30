import { TsConfigPaths } from "./dependencyAnalyser";

/**
 * Determines if an import path refers to a node module (external dependency)
 * Handles both scoped (@org/pkg) and regular (lodash) packages
 *
 * @param importPath - The raw import path from the code
 * @param paths - TypeScript path mappings from tsconfig
 * @returns True if the import is a node module, false otherwise
 */
export function isNodeModule(
  importPath: string,
  paths: TsConfigPaths
): boolean {
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
