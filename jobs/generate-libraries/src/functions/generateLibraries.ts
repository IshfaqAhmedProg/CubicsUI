import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import * as prettier from "prettier";
import path from "path";
import { genReactButton } from "@cubicsui/gen";
import generatePackageJson from "./generatePackageJson.js";
import { LibraryGeneratorProps } from "../interfaces/LibraryGenerator.js";

/**
 * This function is responsible to generate all the components under the workspace library/
 * The components will be divided based on target environments React, Svelte, Next
 * The generated folder structure for each component will look something like this:-
 * @filetree
 * ```
 * packages/library/[env]/[component]
 * |── src/
 * |   |── index.ts
 * |   |── index.css
 * |── eslintrc.json
 * |── package.json
 * |── tsconfig.ts
 * ```
 * Each folder created for the component will contain its own package.json file with project name of the format
 *
 * `@cubicsui/[env]-[component]`
 *
 * This is created so that non-CLI users can install individual components using
 * @example```
 * `npm i @cubicsui/react-button`
 * ```
 *
 */
export default async function generateLibrary({
  targetEnv,
  ...component
}: LibraryGeneratorProps) {
  const cmp = genReactButton({
    componentName: component.name,
    mode: "typescript",
    styleEngine: "tailwind",
    stylesName: "cssStyles",
  });

  try {
    const rootDir = path.resolve(process.cwd(), "../..");
    const componentDir = path.resolve(
      rootDir,
      `library/${targetEnv}/${component.name}`
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
        JSON.stringify(generatePackageJson({ ...component, targetEnv })).trim(),
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
    console.error("✖ Error while generating library:", error);
  }
}
