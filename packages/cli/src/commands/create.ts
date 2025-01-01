import { existsSync, mkdirSync } from "fs";
import * as prettier from "prettier";
import { writeFile } from "fs/promises";
import path from "path";
import db from "../configs/prismaClient.js";
import changeCase from "../functions/changeCase.js";
import loadConfig from "../functions/loadConfig.js";
export default async function create(requestedComponent: string) {
  try {
    const config = await loadConfig();
    console.log("Loaded config:", config, requestedComponent);

    const componentFromDB = await db.components.findFirst({
      where: { name: requestedComponent },
    });
    if (!componentFromDB) throw new Error("Component not found in database");

    const outFileName = changeCase(
      componentFromDB.name,
      config.fileNamingConvention
    );
    const outDirName = changeCase(
      componentFromDB.name,
      config.dirNamingConvention
    );
    const componentsDir = config.componentsDir
      ? `${config.componentsDir}/components`
      : "components";

    const outPath = path.resolve(
      process.cwd(),
      `${componentsDir}/${outDirName}/${outFileName}.tsx`
    );

    console.log("outPath", outPath);

    const dirPath = path.dirname(outPath);

    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }

    const finalConfigContent = await prettier.format(
      componentFromDB.code.trim(),
      { parser: "babel-ts" }
    );

    await writeFile(outPath, finalConfigContent);
    console.log(`⏳ Building ${requestedComponent}, please wait...`);
    console.log(`✔ Created ${requestedComponent} in the project root.`);
  } catch (error) {
    // console.log(error);
    console.error(`✖ Failed to create ${requestedComponent}:`, error);
    process.exit(1);
  }
}
