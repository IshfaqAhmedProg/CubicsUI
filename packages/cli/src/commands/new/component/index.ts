import { readFile } from "fs/promises";
import { basename, extname } from "path";
import { db } from "@cubicsui/db";
import { dependencyAnalyser } from "@cubicsui/helpers";
import getRelativePathFromFullPath from "./functions/getRelativePathFromFullPath.js";
import loadConfig from "@/utils/loadConfig.js";

/**
 * Creates the given filePath as a component in the database
 * @param filepath Path of the file you want to upload
 *
 * @returns {Promise<void>} Resolves when succesfully uploaded
 *
 * @throws {Error} Exits the process if database is not found
 *
 * @example
 * // Typical usage
 * npx cui upload <filepath>
 */
export default async function (filepath: string): Promise<void> {
  console.log(filepath);
  try {
    const config = await loadConfig();
    console.log("Reading filepath");
    // Read the filepath
    const fileContent = (await readFile(filepath)).toString();

    // Create deps {ext:[],lcl:[]}
    const deps = await dependencyAnalyser(fileContent, { "@/*": ["./*"] });
    console.log("Dependencies found in the file:", deps);

    // traverse and create lcl deps if it doesnt exist

    // Create component
    console.log(
      `⏬ Fetching project ${config.databaseOptions.projectName} from database, please wait...`
    );
    const project = await db.projects.findFirstOrThrow({
      where: { name: config.databaseOptions.projectName },
    });

    const name = basename(filepath, extname(filepath));
    const outPath = getRelativePathFromFullPath(
      filepath,
      config.envOptions.rootDir
    );

    console.log("⏫ Uploading component to database");
    const component = await db.components.create({
      data: {
        prId: project.id,
        name,
        outPath,
        deps,
        desc: "",
      },
    });
    // Create codeblocks
    await db.codeblocks.create({
      data: {
        cmpId: component.id,
        script: fileContent,
      },
    });
    console.log(`✔ Component ${component.name} uploaded to database`);
  } catch (error) {
    console.error(error);
  }
}
