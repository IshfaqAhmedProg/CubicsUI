import { existsSync } from "fs";
import { resolve } from "path/posix";
import { configFiles, DetectedConfig } from "../interfaces/CUIConfig.js";

/**
 * Check which env value suits the best for the host project
 * @param detectedConfig
 * @returns {Promise<DetectedConfig>} The detected config for the host project
 */
export async function checkEnv(
  detectedConfig: DetectedConfig
): Promise<DetectedConfig> {
  return detectedConfig;
}

/**
 * Check if project is using typescript or not by checking if the
 * file `tsconfig.json` exists or not
 * @param {DetectedConfig} detectedConfig
 * @returns {Promise<DetectedConfig>} The detected config for the host project
 */
export async function checkTypescript(
  detectedConfig: DetectedConfig
): Promise<DetectedConfig> {
  const tsconfig = resolve(process.cwd(), "tsconfig.json");
  if (existsSync(tsconfig)) {
    console.log(
      "⚠ tsconfig.json file detected, typescript is set to true in config file!"
    );
    detectedConfig.typescript = true;
  } else detectedConfig.typescript = false;
  return detectedConfig;
}

/**
 * Check the style engine used in the host project
 * @param detectedConfig
 * @returns {Promise<DetectedConfig>} The detected config for the host project
 */
export async function checkStyleEngine(
  detectedConfig: DetectedConfig
): Promise<DetectedConfig> {
  return detectedConfig;
}
/**
 * Check if there is an existing cui.config in the project
 */
export async function checkIfConfigExists() {
  if (configFiles.some((cf) => existsSync(resolve(process.cwd(), cf)))) {
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
}
