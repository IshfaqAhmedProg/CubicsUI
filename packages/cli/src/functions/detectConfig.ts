import configGen from "./configGen.js";
import { DetectedConfig } from "../types/CUIConfig.js";
import {
  checkEnv,
  isUsingTypescript,
  checkStyleEngine,
  checkIfSrcFolderExists,
} from "./checks.js";
import { InitOptions } from "../commands/init.js";

/**
 * Detects the host projects environment using check functions defined in checks.ts
 * during the initialisation stage
 * @returns {DetectedConfig} The detected config for the host project
 */
export default function getDetectedConfig(
  options: InitOptions
): DetectedConfig {
  console.log("⏳ Checking project environment, please wait...");
  const detectedConfig = configGen() as DetectedConfig;
  detectedConfig.env = checkEnv();
  detectedConfig.typescript = options?.typescript ?? isUsingTypescript();
  detectedConfig.styleEngine = checkStyleEngine();
  detectedConfig.rootDir = checkIfSrcFolderExists() ? "./src" : ".";
  return detectedConfig;
}
