import { existsSync, mkdirSync as _mkdirSync } from "fs";
import { dirname } from "path";

/**
 * Creates a directory from a full resolved filepath and returns the path of the directory
 * @returns {string} Path to the directory
 */
export default function mkDirSync(fullPathOfFile: string): string {
  const dirPath = dirname(fullPathOfFile);
  if (!existsSync(dirPath)) {
    _mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
}
