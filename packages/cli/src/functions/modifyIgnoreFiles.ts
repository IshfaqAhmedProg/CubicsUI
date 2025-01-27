import { readFile } from "fs/promises";
import { resolve } from "path";
import { filesToIgnore } from "./buildCacheFolder.js";
import writeFile from "./writeFile.js";

/**
 * Writes files to ignore to .gitignore and other ignore files if present
 * @returns void
 */
export default async function modifyIgnoreFiles() {
  const ignoreFilePath = resolve(process.cwd(), ".gitignore");
  const ignoreFileData = await readFile(ignoreFilePath).catch((err) => {
    if (err.code === "ENOENT") {
      console.warn(`ignore file not found: ${ignoreFilePath}`);
    }
  });
  const filesToIgnoreString = filesToIgnore.join("\n");
  const dataToAppend = "# Added by CubicsUI" + "\n" + filesToIgnoreString;

  if (ignoreFileData?.includes(filesToIgnoreString)) {
    return;
  }
  await writeFile(ignoreFilePath, dataToAppend, "a");
}
