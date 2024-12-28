import { existsSync, mkdirSync } from "fs";
import { genReactButton } from "@cubicsui/gen";
import * as prettier from "prettier";
import { writeFile } from "fs/promises";
import path from "path";
import loadConfig from "../functions/loadConfig.js";
import { changeCase, componentsDB } from "@cubicsui/db";

export default async function create(requestedComponent: string) {
  try {
    const config = await loadConfig();
    console.log("Loaded config:", config);

    const cpdb = await componentsDB();

    const componentFromDB = cpdb.chain
      .get("components")
      .find({ name: requestedComponent })
      .value();
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
    const componentToGenerate = genReactButton({
      componentName: "button",
      mode: "typescript",
      styleEngine: "css",
      stylesName: "cssStyles",
    });
    const finalConfigContent = await prettier.format(
      componentToGenerate.trim(),
      { parser: "babel-ts" }
    );

    await writeFile(outPath, finalConfigContent);
    console.log(`⏳ Building ${requestedComponent}, please wait...`);
    console.log(`✔ Created ${requestedComponent} in the project root.`);
  } catch (error) {
    console.error(`✖ Failed to create ${requestedComponent}:`, error);
    process.exit(1);
  }
}
