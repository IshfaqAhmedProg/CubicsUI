import db from "../configs/prismaClient.js";
import loadConfig from "../functions/loadConfig.js";
import { Prisma } from "@cubicsui/db";
import path from "path";
import createStyleFileName from "../functions/styleFileName.js";
export default async function create(requestedComponent: string) {
  try {
    const config = await loadConfig();
    console.log("Loaded config:", config, requestedComponent);

    const component = await db.components.findFirstOrThrow({
      where: { name: requestedComponent },
      include: { codeblocks: true },
    });

    if (!component)
      throw new Error(
        "Component not found in the database. Please check the component name and try again."
      );
    if (!component.codeblocks?.script) {
      throw new Error(
        "Component script is missing. Please check the script section of the component and try again."
      );
    }
    const outPath = path.resolve(
      process.cwd(),
      `${config.rootDir}/${component.outPath}`
    );
    const fileName = outPath.split("/").pop();

    const styleName = createStyleFileName({ fileName, component });

    console.log(component);
    console.log({ styleName, fileName, outPath });

    // if (!existsSync(outPath)) {
    //   mkdirSync(outPath, { recursive: true });
    // }

    console.log(`⏳ Building ${requestedComponent}, please wait...`);
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
