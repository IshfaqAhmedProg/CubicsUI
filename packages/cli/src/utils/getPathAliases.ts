import { TsConfigPaths } from "@cubicsui/helpers";
import { existsSync, readFileSync } from "fs";

/**
 * Gets paths aliases from tsconfig.json or jsconfig.json or whichever file is pointed to in the configPath param
 * @param configPath file path of either tsconfig.json or jsconfig.json
 * @returns {TsConfigPaths} paths object from either tsconfig or jsconfig.
 */
export default function getPathAliases(
  configPath?: string
): TsConfigPaths | undefined {
  // Default to tsconfig.json, fallback to jsconfig.json if not provided
  const configFile =
    configPath ||
    (existsSync("tsconfig.json") ? "tsconfig.json" : "jsconfig.json");

  if (!existsSync(configFile)) {
    console.error(`tsconfig or jsconfig file not found: ${configFile}`);
    return undefined;
  }
  try {
    const configContent = readFileSync(configFile, "utf-8");
    const config = JSON.parse(configContent);
    return config.compilerOptions?.paths;
  } catch (error) {
    console.error(`Error reading ${configFile}:`, error);
    return undefined;
  }
}
