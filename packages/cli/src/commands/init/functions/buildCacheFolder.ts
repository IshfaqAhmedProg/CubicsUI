import { resolve } from "path";
import {
  cacheDirName,
  defaultLibrary,
  projectCacheName,
} from "@/constants/defaults.js";
import { db } from "@cubicsui/db";
import writeFile from "@/utils/writeFile.js";

/**
 * Builds the cache folder `.cui` in the root of the project
 */
export default async function buildCacheFolder() {
  // Initialise
  const prFilePath = resolve(process.cwd(), cacheDirName, projectCacheName);

  console.log("⏬ Fetching default component library!");
  const prFileContent = await db.libraries.findFirst({
    where: { name: defaultLibrary },
    include: { configurations: true },
  });
  // Write default project data
  await writeFile(prFilePath, JSON.stringify(prFileContent));
}
