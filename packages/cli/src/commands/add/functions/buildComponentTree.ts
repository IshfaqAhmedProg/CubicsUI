import buildStyleModule from "./buildStyleModule.js";
import { CUIConfig } from "@/types/CUIConfig.js";
import { ComponentWithCB } from "@/types/Components.js";
import { db } from "@cubicsui/db";
import { resolve } from "path";
import writeFile from "@/utils/writeFile.js";

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
  const outPath = resolve(
    process.cwd(),
    config.envOptions.rootDir,
    component.outPath
  );

  const componentOutPath = resolve(
    process.cwd(),
    config.envOptions.rootDir,
    component.outPath
  );

  const lclDeps = component.deps.lcl;
  console.log(`👀 Analysing ${component.name} dependencies`);
  for (const dep of lclDeps) {
    switch (dep.cmpId) {
      case "":
      case undefined:
      case null:
        console.error(
          `Dependency: ${dep.name}, isnt linked to any component or styles`
        );
        break;
      case "styles":
        await buildStyleModule(outPath, component, config);
        break;
      default:
        {
          const localDepComponent = await db.components.findFirstOrThrow({
            where: { id: dep.cmpId },
            include: { codeblocks: true },
          });
          // building local dependencies component trees
          await buildComponentTree(localDepComponent, config);
        }
        break;
    }
  }
  // TODO Add modifications, like TS->JS to the script here

  await writeFile(componentOutPath, component.codeblocks.script);
  console.log(`✔ Created ${component.name} in your project.`);
}
