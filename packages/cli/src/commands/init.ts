import { resolve } from "path";
import { format } from "prettier";
import { writeFile } from "fs/promises";
import { existsSync } from "fs";
import { configFiles } from "../config/loadConfig.js";

/**
 * Builds the config file for cli, the config file determines what kind of component should be created
 * when running
 * @`npx cui create <component>`
 */
export default async function init() {
  let finalConfig = configFiles[0];

  // Check if config already exists in the root
  if (configFiles.some((cf) => existsSync(resolve(process.cwd(), cf.name)))) {
    console.log(
      `This project seems to be already initialised for @cubicsui/cli.
      If you want to install a new component
      Run:
         npx cui create <component>`
    );
    console.error(
      "If you are trying to reinitialise this project then delete the config file(cui.config) before initialising again."
    );
    process.exit(1);
  }
  console.log("⏳ Building config file, please wait...");
  // TODO ask using inquirer

  // Check if env is typescript
  const tsconfig = resolve(process.cwd(), "tsconfig.json");
  if (existsSync(tsconfig)) {
    console.log("⏳ tsconfig.json file detected, switching to typescript mode");
    finalConfig = configFiles[1];
  }

  try {
    console.log("⏳ Finalizing config file, please wait...");

    // Format the final config with prettier
    const finalConfigContent = await format(finalConfig.content.trim(), {
      semi: false,
      parser: "babel-ts",
    });
    await writeFile(
      resolve(process.cwd(), finalConfig.name),
      finalConfigContent
    );

    console.log(`✔ Created ${finalConfig.name} in the project root.`);
  } catch (error) {
    console.error(`✖ Failed to create ${finalConfig.name}:`, error);
    process.exit(1);
  }
}
