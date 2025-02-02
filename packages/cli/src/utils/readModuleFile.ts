import { commonJSExtensions } from "@/constants/defaults.js";
import { existsSync } from "fs";
import { readFile as _readFile } from "fs/promises";
import { extname, resolve } from "path";

type ReadModuleData = {
  path: string;
  data: string;
};

/**
 * Reads the data in a module file
 * @param filePath path of the module can have extension or no extension
 * @returns {ReadModuleData} path with extension and data of the file
 */
export default async function readModuleFile(
  filePath: string
): Promise<ReadModuleData> {
  // If file already has an extension, try reading it directly
  if (extname(filePath)) {
    return { path: filePath, data: (await _readFile(filePath)).toString() };
  }

  // Try appending common extensions
  for (const ext of commonJSExtensions) {
    const filePathWithExt = `${filePath}${ext}`;
    if (existsSync(filePathWithExt)) {
      return {
        path: filePathWithExt,
        data: (await _readFile(filePathWithExt)).toString(),
      };
    }
  }

  // Check if depPath is a directory and contains an index file
  for (const ext of commonJSExtensions) {
    const indexFilePath = resolve(filePath, `index${ext}`);
    if (existsSync(indexFilePath)) {
      return {
        path: indexFilePath,
        data: (await _readFile(indexFilePath)).toString(),
      };
    }
  }

  throw new Error(`No valid file found with ${filePath}`);
  // No valid file found
}
