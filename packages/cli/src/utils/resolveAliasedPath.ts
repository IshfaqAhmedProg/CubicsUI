import { TsConfigPaths } from "@cubicsui/helpers";
import { resolve } from "path";

/**
 * Resolves aliased paths, if the path is not aliased then it just resolves it to the base path
 * @param depPath Local dependency path
 * @param baseDir Base directory from where the pathAlias should walk
 * @param pathAliases Path aliases from a tsconfig or jsconfig file
 * @returns Path to the local dependency with path aliases replaced
 * @example
 * const resolvedPath= resolveAliasedPath("@/utils/getInitials","./src/",{"@/*":["./src/*"]})
 * // `C:/project/src/utils/getInitials`
 */
export default function resolveAliasedPath(
  depPath: string,
  baseDir: string,
  pathAliases?: TsConfigPaths
): string {
  for (const alias in pathAliases) {
    const aliasPaths = pathAliases[alias]; // Array of possible replacements

    // Convert alias into a proper regex for wildcard support
    const aliasRegex = new RegExp(`^${alias.replace("/*", "/(.*)")}$`);

    // Check if the dependency name matches the alias pattern
    const match = depPath.match(aliasRegex);
    if (match && aliasPaths.length > 0) {
      // Extract the remaining part after alias replacement
      const relativePath = match[1] || ""; // Ensure we handle the case where nothing follows the alias
      return resolve(aliasPaths[0].replace("/*", ""), relativePath);
    }
  }

  return resolve(baseDir, depPath); // If no alias matches, treat as a relative path
}
