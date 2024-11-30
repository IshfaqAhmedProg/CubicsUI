import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import * as prettier from "prettier";
import path from "path";
import genReactButton from "../../dist/components/button/reactButton";

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
export default async function generateLibraries() {
  const button = genReactButton({
    componentName: "button",
    mode: "typescript",
    styleEngine: "css",
    stylesName: "cssStyles",
  });
  try {
    const packagesPath = path.resolve(process.cwd(), "..");
    let outPath = path.resolve(packagesPath, "library/React/Button/button.tsx");

    // Ensure the directory exists before writing
    const dirPath = path.dirname(outPath);
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }

    // Format the final config with prettier
    const prettierButton = await prettier.format(button, {
      semi: false,
      parser: "babel-ts",
    });
    await writeFile(outPath, prettierButton, { flag: "w+" });
  } catch (error) {
    console.error("Error while writing file:", error);
  }
}
