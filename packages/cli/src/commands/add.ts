import db from "../configs/prismaClient.js";
import loadConfig from "../functions/loadConfig.js";
import { Prisma } from "@cubicsui/db";
import buildComponentTree from "../functions/buildComponentTree.js";
import { ComponentWithCB } from "../types/Components.js";

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

export default async function add(requestedComponent: string): Promise<void> {
  try {
    const config = await loadConfig();

    // TODO use cache .cui/project.json instead
    console.log(
      `⏬ Fetching project: ${config.databaseConfig.project} from database, please wait...`
    );
    const project = await db().projects.findFirst({
      where: { name: config.databaseConfig.project },
    });

    if (!project)
      throw new Error(
        `No project with name ${config.databaseConfig.project} found!`
      );

    console.log(
      `⏬ Fetching component: ${requestedComponent} from database, please wait...`
    );
    const component = (await db().components.findFirstOrThrow({
      where: {
        name: requestedComponent,
        prId: project.id,
      },
      include: { codeblocks: true },
    })) as ComponentWithCB;

    await buildComponentTree(component, config);

    console.log(`✨ You are good to go!`);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.error(
        `✖ ${requestedComponent} does not exist in the database:`,
        error.message
      );
    }
    // console.log(error);
    console.error(`✖ Failed to create ${requestedComponent}:`, error);
    process.exit(1);
  }
}
