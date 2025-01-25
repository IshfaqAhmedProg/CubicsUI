import { existsSync, mkdirSync } from "fs";
import { dirname } from "path";

/**
 * Creates a directory from a full resolved filepath and returns the path of the directory
 * @returns {string} Path to the directory
 */
export default function createDirFromPath(outPath: string): string {
  const dirPath = dirname(outPath);
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
}
