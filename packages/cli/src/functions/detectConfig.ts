import { DetectedConfig } from "../interfaces/CUIConfig.js";
import { defaultRequiredValues } from "../constants/config.js";
import { checkEnv, checkTypescript, checkStyleEngine } from "./checks.js";

/**
 * Detects the host projects environment using check functions defined in checks.ts
 * @returns {Promise<DetectedConfig>} The detected config for the host project
 */
export default async function detectConfig(): Promise<DetectedConfig> {
  console.log("⏳ Checking project environment, please wait...");
  let detectedConfig = defaultRequiredValues() as DetectedConfig;
  detectedConfig = await checkEnv(detectedConfig);
  detectedConfig = await checkTypescript(detectedConfig);
  detectedConfig = await checkStyleEngine(detectedConfig);
  return detectedConfig;
}
