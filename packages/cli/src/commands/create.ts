import { existsSync, mkdirSync } from "fs";
import { possibleConfigs } from "./init.js";
import { genReactButton } from "@cubicsui/gen";
import * as prettier from "prettier";
import { writeFile } from "fs/promises";
import path from "path";

export default async function create(component: string) {
  const outPath = path.resolve(
    process.cwd(),
    `components/${component}/${component}.tsx`
  );
  const dirPath = path.dirname(outPath);
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }

  const activeConfig = possibleConfigs.find((pc) => existsSync(pc.path));
  // Check if config  exists
  if (!activeConfig)
    throw new Error(
      `Config file is missing, please initiate your project
      Run: 
          npx cui init`
    );
  // const cuiConfig = require(activeConfig.path);

  try {
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

    console.log(`⏳ Building ${component}, please wait...`);
    console.log(`✔ Created ${component} in the project root.`);
  } catch (error) {
    console.error(`✖ Failed to create ${component}:`, error);
    process.exit(1);
  }
}
