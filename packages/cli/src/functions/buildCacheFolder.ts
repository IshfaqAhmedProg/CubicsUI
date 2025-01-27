import { resolve } from "path";
import { defaultProject } from "../constants/defaults.js";
import db from "../configs/prismaClient.js";
import writeFile from "./writeFile.js";
import { readFile } from "fs/promises";

const cacheDirName = ".cui";
const filesToIgnore = [cacheDirName];
export default async function buildCacheFolder() {
  // Initialise
  const prFilePath = resolve(process.cwd(), cacheDirName, "project.json");

  console.log(
    "⏬ Fetching using default databaseConfig, if you want to use your own database and project make sure to add them in databaseConfig in the cui.config files "
  );
  const prFileContent = await db().projects.findFirst({
    where: { name: defaultProject },
    include: { configurations: true },
  });
  // Write default project data
  await writeFile(prFilePath, JSON.stringify(prFileContent));

  await handleIgnoreFiles();
}

/**
 * Writes files to ignore to .gitignore and other ignore files if present
 * @returns void
 */
async function handleIgnoreFiles() {
  const ignoreFilePath = resolve(process.cwd(), ".gitignore");
  const ignoreFileData = await readFile(ignoreFilePath).catch((err) => {
    if (err.code === "ENOENT") {
      console.warn(`ignore file not found: ${ignoreFilePath}`);
    }
  });
  const ignoreDataComments = "# cui";
  const filesToIgnoreString = filesToIgnore.join("\n");
  const dataToAppend = ignoreDataComments + "\n" + filesToIgnoreString;
  console.log({ ignoreFilePath, ignoredFiles: filesToIgnore });
  if (ignoreFileData?.includes(filesToIgnoreString)) {
    return;
  }
  await writeFile(ignoreFilePath, dataToAppend, "a");
}
