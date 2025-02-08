import { CUIConfig } from "@/types/CUIConfig.js";
import getPathAliases from "@/utils/getPathAliases.js";
import { dependencyAnalyser } from "@cubicsui/helpers";
import { input, select } from "@inquirer/prompts";
import { basename, dirname, extname, resolve } from "path";
import getRelativePathFromFullPath from "./getRelativePathFromFullPath.js";
import readModuleFile from "@/utils/readModuleFile.js";
import { components, libraries } from "@cubicsui/db";
import upsertComponent from "./upsertComponent.js";
import populateDependencyIds from "./populateDependencyIds.js";

export default async function uploadComponentTree(
  library: libraries,
  filePath: string,
  config: CUIConfig
): Promise<components | undefined> {
  // Read the filepath and initialise
  const fileContent = await readModuleFile(filePath);
  console.log(`⚠ Found a component in ${fileContent.path}`);
  // Await for user inputs
  const name = await input({
    message: "Enter the name of the component:",
    default: basename(filePath, extname(filePath)),
  });
  const outPath = getRelativePathFromFullPath(
    fileContent.path,
    config.envOptions.rootDir
  );
  const pathAliases = getPathAliases();
  // Create deps {ext:[],lcl:[]}
  const deps = await dependencyAnalyser(fileContent.data, pathAliases);
  let styleModuleData = null;

  // Only run dependency linking if there are local dependencies
  if (deps.lcl.length > 0) {
    // Ask if any of the deps are style modules
    const styleModule = await select({
      message: "Are any of these dependencies style modules?",
      choices: deps.lcl.map((ld) => {
        return { name: `"${ld.name}"`, value: ld.name };
      }),
    });
    // get the data from the style module
    if (styleModule) {
      styleModuleData = (
        await readModuleFile(resolve(dirname(filePath), styleModule))
      ).toString();
    }
    deps.lcl = await populateDependencyIds({
      localDeps: deps.lcl,
      library: library,
      config,
      pathAliases,
      styleModule,
    });
  }

  const component = await upsertComponent({
    component: { name, libId: library.id, deps, desc: "", outPath },
    codeblocks: { script: fileContent.data, styles: styleModuleData },
  });

  return component;
}
