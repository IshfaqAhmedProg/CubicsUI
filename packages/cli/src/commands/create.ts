import db from "../configs/prismaClient.js";
import loadConfig from "../functions/loadConfig.js";
import { Prisma } from "@cubicsui/db";
import buildComponentTree from "../functions/buildComponentTree.js";
import { ComponentWithCB } from "../types/Components.js";

export default async function create(requestedComponent: string) {
  try {
    const config = await loadConfig();
    // console.log("Loaded config:", config, requestedComponent);

    const component = (await db.components.findFirstOrThrow({
      where: { name: requestedComponent },
      include: { codeblocks: true },
    })) as ComponentWithCB;

    await buildComponentTree(component, config);

    console.log(`✔ Created ${requestedComponent} in the project root.`);
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
