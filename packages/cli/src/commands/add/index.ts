import { db } from "@cubicsui/db";
import loadConfig from "@/utils/loadConfig.js";
import buildComponentTree from "./functions/buildComponentTree.js";
import { ComponentWithCB } from "@/types/Components.js";
import { isDocumentNotFoundError } from "@/utils/errors.js";

/**
 * Adds the requested component from the database to your project, by building the dependency tree
 * @param requestedComponent The name of the component to build
 *
 * @returns {Promise<void>} Resolves when component tree is successfully built
 *
 * @throws {Error} Exits the process if project or component in the dependency tree, doesnt exist
 *
 * @example
 * // Typical usage
 * npx cui add <component>
 */

export default async function (requestedComponent: string): Promise<void> {
  try {
    const config = await loadConfig();

    // TODO use cache .cui/library.json instead
    console.log(
      `⏬ Fetching library: ${config.databaseOptions.libraryName} from database, please wait...`
    );
    const library = await db.libraries.findFirst({
      where: { name: config.databaseOptions.libraryName },
    });

    if (!library)
      throw new Error(
        `No project with name ${config.databaseOptions.libraryName} found!`
      );

    console.log(
      `⏬ Fetching component: ${requestedComponent} from database, please wait...`
    );
    const component = (await db.components.findFirstOrThrow({
      where: {
        name: requestedComponent,
        libId: library.id,
      },
      include: { codeblocks: true },
    })) as ComponentWithCB;

    await buildComponentTree(component, config);

    console.log(`✨ You are good to go!`);
  } catch (error) {
    if (isDocumentNotFoundError(error)) {
      console.error(`✖ ${requestedComponent} does not exist in the database:`);
    } else {
      console.error(`✖ Failed to create ${requestedComponent}:`, error);
    }
    process.exit(1);
  }
}
