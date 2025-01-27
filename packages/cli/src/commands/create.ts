import db from "../configs/prismaClient.js";
import loadConfig from "../functions/loadConfig.js";
import { Prisma } from "@cubicsui/db";
import buildComponentTree from "../functions/buildComponentTree.js";
import { ComponentWithCB } from "../types/Components.js";

export default async function add(requestedComponent: string) {
  try {
    const config = await loadConfig();

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
      // where: {
      // OR: [
      // { name: requestedComponent },
      // { tags: { has: requestedComponent } },
      // ],
      // },

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
