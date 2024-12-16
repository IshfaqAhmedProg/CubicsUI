import { existsSync, mkdirSync } from "fs";
import { genReactButton } from "@cubicsui/gen";
import * as prettier from "prettier";
import { writeFile } from "fs/promises";
import path from "path";
import loadConfig from "../config/loadConfig.js";

export default async function create(component: string) {
  try {
    const config = await loadConfig();
    console.log("Loaded config:", config);

    const outPath = path.resolve(
      process.cwd(),
      `components/${component}/${component}.tsx`
    );
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

    console.log(`⏳ Building ${component}, please wait...`);
    console.log(`✔ Created ${component} in the project root.`);
  } catch (error) {
    console.error(`✖ Failed to create ${component}:`, error);
    process.exit(1);
  }
}
