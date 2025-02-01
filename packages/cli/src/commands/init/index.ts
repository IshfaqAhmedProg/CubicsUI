import {
  checkIfAlreadyConfigured,
  checkIfDBUrlExistsInEnvironment,
} from "@/utils/checks.js";
import buildConfigFile from "./functions/buildConfigFile/index.js";
import buildCacheFolder from "./functions/buildCacheFolder.js";
import modifyIgnoreFiles from "./functions/modifyIgnoreFiles.js";
import setupEnvironment from "./functions/setupEnviroment.js";
import rerunInit from "./functions/rerunInit.js";

export interface InitOptions {
  typescript?: boolean;
}

/**
 * Initializes the configuration file and the cache folder ".cui" for the CubicsUI CLI toolkit.
 *
 * @description
 * Prepares the project for component generation using CubicsUI by creating a configuration file
 * and cache folder `.cui` and modifies existing `.gitignore` file to ignore `.cui` folder.
 *
 * @returns {Promise<void>} Resolves when configuration is successfully created
 *
 * @throws {Error} Exits the process if initialization fails or config already exists
 *
 * @example
 * // Typical usage
 * npx cui init
 */
export default async function (options: InitOptions): Promise<void> {
  // Check if config already exists in the root
  checkIfAlreadyConfigured();

  // Check if environment variables already exists if it exists continue or else buildEnvFile and then rerun the cui init function
  if (!checkIfDBUrlExistsInEnvironment()) {
    console.log(
      "Looks like environment variable CUI_DATABASE_URL is missing, cui will now add the default value of CUI_DATABASE_URL to .env file"
    );
    await setupEnvironment();
    await rerunInit();
  } else {
    await buildCacheFolder();
    await buildConfigFile(options);
    await modifyIgnoreFiles();
  }
}
