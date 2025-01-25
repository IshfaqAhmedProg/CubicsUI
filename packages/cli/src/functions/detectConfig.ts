import configGen from "./configGen.js";
import { DetectedConfig } from "../types/CUIConfig.js";
import {
  checkEnv,
  checkTypescript,
  checkStyleEngine,
  checkIfSrcFolderExists,
} from "./checks.js";

/**
 * Detects the host projects environment using check functions defined in checks.ts
 * during the initialisation stage
 * @returns {DetectedConfig} The detected config for the host project
 */
export default function getDetectedConfig(): DetectedConfig {
  console.log("⏳ Checking project environment, please wait...");
  const detectedConfig = configGen() as DetectedConfig;
  detectedConfig.env = checkEnv();
  detectedConfig.typescript = checkTypescript();
  detectedConfig.styleEngine = checkStyleEngine();
  detectedConfig.rootDir = checkIfSrcFolderExists() ? "./src" : ".";
  return detectedConfig;
}
