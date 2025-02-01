import configGen from "./configGen.js";
import { DetectedConfig } from "@/types/CUIConfig.js";
import {
  checkEnv,
  isUsingTypescript,
  checkIfSrcFolderExists,
  checkStyleEngine,
} from "@/utils/checks.js";
import { InitOptions } from "@/commands/init/index.js";

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
  detectedConfig.envOptions.env = checkEnv();
  detectedConfig.envOptions.styleExt = checkStyleEngine();
  detectedConfig.envOptions.typescript =
    options?.typescript ?? isUsingTypescript();
  detectedConfig.envOptions.rootDir = checkIfSrcFolderExists() ? "./src" : ".";
  return detectedConfig;
}
