import buildStyleModule from "./buildStyleModule.js";
import { CUIConfig } from "../types/CUIConfig.js";
import { ComponentWithCB } from "../types/Components.js";
import db from "../configs/prismaClient.js";
import { resolve } from "path";
import writeFile from "./writeFile.js";

export default async function buildComponentTree(
  component: ComponentWithCB,
  config: CUIConfig
) {
  console.log(`⏳ Building ${component.name}`);
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

  const componentOutPath = resolve(
    process.cwd(),
    config.rootDir,
    component.outPath
  );

  // TODO Add modifications, like TS->JS to the script here

  await writeFile(componentOutPath, component.codeblocks.script);
  console.log(`✔ Created ${component.name} in the project root.`);

  const lclDeps = component.deps.lcl;
  console.log(`👀 Analysing ${component.name} dependencies`);
  for (const dep of lclDeps) {
    if (dep.cmpId == "styles") {
      await buildStyleModule(outPath, component, config);
    } else {
      const localDepComponent = await db().components.findFirstOrThrow({
        where: { id: dep.cmpId },
        include: { codeblocks: true },
      });
      // building local dependencies component trees
      await buildComponentTree(localDepComponent, config);
    }
  }
}
