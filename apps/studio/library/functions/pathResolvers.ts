import { dirname, relative, resolve } from "path";
import { TsConfigPaths } from "./dependencyAnalyser";
import { isNodeModule } from "./isNodeModule";

/**
 * Resolves import paths that are not node modules or aliased paths
 * @param importPath The raw import path from the code
 * @param outPath The raw output path for the code
 * @returns Resolved relative path of the import
 */
function resolveRelativePath(importPath: string, outPath: string): string {
  if (!importPath.startsWith(".")) {
    return importPath;
  }

  // Get the directory of the current file
  const currentDir = dirname(outPath);

  // Resolve the import path relative to the current directory
  const resolvedPath = resolve(currentDir, importPath);

  // Get the relative path starting from the components directory
  const componentsDir = resolve(currentDir, "../..");
  const finalPath =
    "./" + relative(componentsDir, resolvedPath).replace(/\\/g, "/");

  return finalPath;
}
/**
 * Resolves an import path using TypeScript path aliases
 * Example: '@/components/Button' -> './src/components/Button'
 *
 * @param importPath - The raw import path from the code
 * @param paths - TypeScript path mappings from tsconfig
 * @returns The resolved path
 */
export function resolveLocalDependencyPath(
  importPath: string,
  paths: TsConfigPaths,
  outPath: string
): string {
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
      console.log("normalizedAlias", importPath, normalizedAlias);
      for (const possiblePath of possiblePaths) {
        const normalizedPossiblePath = possiblePath.replace(/\/\*$/, "");
        return importPath.replace(normalizedAlias, normalizedPossiblePath);
      }
    } else if (importPath.startsWith(".")) {
      console.log("resolvedpath", resolveRelativePath(importPath, outPath));
      return resolveRelativePath(importPath, outPath);
    }
  }
  return importPath;
}
