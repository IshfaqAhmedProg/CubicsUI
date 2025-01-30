import { resolve } from "path";
import {
  cacheDirName,
  defaultProject,
  projectCacheName,
} from "../constants/defaults.js";
import { db } from "@cubicsui/db";
import writeFile from "./writeFile.js";

export default async function buildCacheFolder() {
  // Initialise
  const prFilePath = resolve(process.cwd(), cacheDirName, projectCacheName);

  console.log(
    "⏬ Fetching using default databaseConfig, if you want to use your own database and project make sure to add them in databaseConfig in the cui.config files "
  );
  const prFileContent = await db.projects.findFirst({
    where: { name: defaultProject },
    include: { configurations: true },
  });
  // Write default project data
  await writeFile(prFilePath, JSON.stringify(prFileContent));
}
