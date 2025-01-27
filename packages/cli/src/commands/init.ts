import { checkIfAlreadyConfigured } from "../functions/checks.js";
import buildConfigFile from "../functions/buildConfigFile.js";
import buildCacheFolder from "../functions/buildCacheFolder.js";

/**
 * Initializes the configuration file and the cache folder ".cui" for the CubicsUI CLI toolkit.
 *
 * @description
 * Prepares the project for component generation using CubicsUI by creating a configuration file.
 * This function is typically invoked via the `npx cui init` command.
 *
 * @workflow
 * - Automatically detects project configuration parameters
 * - Generates a standardized configuration file in the project root
 *
 * @returns {Promise<void>} Resolves when configuration is successfully created
 *
 * @throws {Error} Exits the process if initialization fails or config already exists
 *
 * @example
 * // Typical usage
 * npx cui init
 */
export default async function init(): Promise<void> {
  // Step 1. Check if config already exists in the root
  checkIfAlreadyConfigured();
  // build the cache folder
  await buildCacheFolder();
  // build the configuration file
  await buildConfigFile();
}
