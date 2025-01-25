import createStyleModule from "./createStyleModule.js";
import { CUIConfig } from "../types/CUIConfig.js";
import { ComponentWithCB } from "../types/Components.js";
import db from "../configs/prismaClient.js";
import { resolve } from "path";
import createDirFromPath from "./createDirFromPath.js";
import { writeFile } from "fs/promises";

export default async function buildComponentTree(
  component: ComponentWithCB,
  config: CUIConfig
) {
  console.log(`⏳ Building ${component.name}, please wait...`);
  if (!component)
    throw new Error(
      "Component not found in the database. Please check the component name and try again."
    );
  if (!component.codeblocks?.script) {
    throw new Error(
      "Component script is missing. Please check the script section of the component and try again."
    );
  }
  const outPath = resolve(process.cwd(), config.rootDir, component.outPath);
  createDirFromPath(outPath);
  // Writing the root component
  const componentOutPath = resolve(
    process.cwd(),
    config.rootDir,
    component.outPath
  );
  // Writing the script to scriptPath
  // console.log(`outPath for ${component.name}`, componentOutPath);
  await writeFile(componentOutPath, component.codeblocks.script);

  const lclDeps = component.deps.lcl;
  console.log(`⏳ Analysing ${component.name} dependencies, please wait...`);
  for (const dep of lclDeps) {
    if (dep.cmpId == "styles") {
      await createStyleModule(outPath, component, config);
    } else {
      const localDepComponent = await db.components.findFirstOrThrow({
        where: { id: dep.cmpId },
        include: { codeblocks: true },
      });
      // building local dependencies component trees
      await buildComponentTree(localDepComponent, config);
    }
  }
}
