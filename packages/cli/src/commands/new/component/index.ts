// import { db } from "@cubicsui/db";
import loadConfig from "@/utils/loadConfig.js";
import uploadComponentTree from "./functions/uploadComponentTree.js";
import { db } from "@cubicsui/db";

/**
 * Creates the given filePath and all its dependencies as a new component in the database
 * @param filepath Path of the file you want to upload
 *
 * @returns {Promise<void>} Resolves when succesfully uploaded
 *
 * @throws {Error} Exits the process if database is not found
 *
 * @example
 * // Typical usage
 * npx cui new component <filepath>
 */
export default async function (filepath: string): Promise<void> {
  console.log(filepath);
  try {
    const config = await loadConfig();
    // TODO replace with cached project
    console.log(
      `⏬ Fetching project ${config.databaseOptions.projectName} from database, please wait...`
    );
    const project = await db.projects.findFirstOrThrow({
      where: { name: config.databaseOptions.projectName },
    });
    await uploadComponentTree(project, filepath, config);
  } catch (error) {
    console.error(error);
  }
}
