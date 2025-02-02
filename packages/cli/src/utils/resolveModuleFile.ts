import { commonJSExtensions } from "@/constants/defaults.js";
import { existsSync } from "fs";
import { readFile as _readFile } from "fs/promises";
import { extname, resolve } from "path";

/**
 * Checks if the given file path exists and returns the path with the extension if it didnt have one
 * @param filePath path of the module can have extension or no extension or can be a directory which will resolve to the index file
 * @returns {string} path with extension
 */
export default async function resolveModuleFile(
  filePath: string
): Promise<string> {
  // If file already has an extension, try reading it directly
  if (extname(filePath)) {
    return filePath;
  }

  // Try appending common extensions
  for (const ext of commonJSExtensions) {
    const filePathWithExt = `${filePath}${ext}`;
    if (existsSync(filePathWithExt)) {
      return filePathWithExt;
    }
  }

  // Check if depPath is a directory and contains an index file
  for (const ext of commonJSExtensions) {
    const indexFilePath = resolve(filePath, `index${ext}`);
    if (existsSync(indexFilePath)) {
      return indexFilePath;
    }
  }

  throw new Error(`No valid file found with ${filePath}`);
  // No valid file found
}
