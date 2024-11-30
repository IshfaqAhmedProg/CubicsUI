import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import * as prettier from "prettier";
import path from "path";
import genReactButton from "../../dist/components/button/genReactButton";
import { initialiseLibraryPackage } from "../constants/libraryPackagesManifest";
import { ComponentName, COMPONENTS, Framework, FRAMEWORKS } from "../generator";

/**
 * This function is responsible to generate all the components under packages/library/
 *
 * The components will be divided based on frameworks React, Svelte, Next
 *
 * The generated folder structure for each component:-
 * library/[framework]/[component]
 * -src
 *    -index.ts
 *    -index.css
 * -eslintrc.json
 * -package.json
 * -tsconfig.ts
 *
 * Each folder created for the component will contain its own package.json file with name of the format
 * @cubicsui/[framework]-[component]
 * This will allow users not using the cli to install a singular component using eg:-
 * npm i @cubicsui/react-button
 *
 */

export default async function generateLibraries(
  componentName: ComponentName = COMPONENTS[0],
  framework: Framework = FRAMEWORKS[0]
) {
  const cmp = genReactButton({
    componentName,
    mode: "typescript",
    styleEngine: "tailwind",
    stylesName: "cssStyles",
  });

  try {
    const rootDir = path.resolve(process.cwd(), "..");
    const componentDir = path.resolve(
      rootDir,
      `library/${framework}/${componentName}`
    );
    const indexPath = path.resolve(
      componentDir,
      `${componentDir}/src/index.tsx`
    );
    const pkgPath = path.resolve(componentDir, `${componentDir}/package.json`);

    // Ensure the directory exists before writing
    const dirPath = path.dirname(indexPath);
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }

    // if [framework]/[componentName]/package.json doesnt exist
    // initialise package.json with libPkgJSONInit
    if (!existsSync(pkgPath)) {
      const prettierPkg = await prettier.format(
        JSON.stringify(
          initialiseLibraryPackage(componentName, framework)
        ).trim(),
        {
          parser: "json",
        }
      );
      await writeFile(pkgPath, prettierPkg);
    }
    // Format the final config with prettier
    const prettierComponentContent = await prettier.format(cmp, {
      parser: "babel-ts",
    });
    await writeFile(indexPath, prettierComponentContent, {
      flag: "w+",
    });
  } catch (error) {
    console.error("Error while writing file:", error);
  }
}
