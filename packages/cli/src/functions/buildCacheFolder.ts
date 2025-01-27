import { resolve } from "path";
import { defaultProject } from "../constants/defaults.js";
import db from "../configs/prismaClient.js";
import writeFile from "./writeFile.js";

export const cacheDirName = ".cui";
export const filesToIgnore = [cacheDirName];
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
}
