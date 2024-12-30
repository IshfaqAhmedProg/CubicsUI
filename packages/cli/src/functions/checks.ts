import { existsSync } from "fs";
import configFiles from "../constants/configFiles.js";
import { resolve } from "path";
import { CUIConfig } from "../types/CUIConfig.js";

/**
 * Check which env value suits the best for the host project
 * @returns {CUIConfig["env"]} The environment detected in the host project
 */
export function checkEnv(): CUIConfig["env"] {
  return {
    library: "react",
    framework: "none",
  };
}

/**
 * Check if project is using typescript or not by checking if the
 * file `tsconfig.json` exists or not
 * @returns {boolean} true if tsconfig.json exists
 */
export function checkTypescript(): boolean {
  return existsSync(resolve(process.cwd(), "tsconfig.json"));
}

/**
 * Check the style engine used in the host project
 * @returns {CUIConfig["styleEngine"]} The detected config for the host project
 */
export function checkStyleEngine(): CUIConfig["styleEngine"] {
  return "css";
}
/**
 * Check if there is a src folder in the project root
 * @returns {boolean} returns true if src folder exists in the root of the project
 */
export function checkIfSrcFolderExists(): boolean {
  return existsSync(resolve(process.cwd(), "src"));
}
/**
 * Check if there is an existing cui.config in the project
 */
export function checkIfAlreadyConfigured() {
  if (configFiles.some((cf) => existsSync(resolve(process.cwd(), cf)))) {
    console.error(
      "This project seems to be already initialised for @cubicsui/cli."
    );
    console.error("If you want to generate a new component run:");
    console.error("   npx cui create <component>");
    console.error(
      "If you are trying to reinitialise this project then delete the config file(cui.config) before initialising again."
    );
    process.exit(1);
  }
}
