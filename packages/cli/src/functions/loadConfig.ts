import { resolve } from "path";
import { register } from "tsx/esm/api";
import { pathToFileURL } from "url";
import CUIConfig from "../interfaces/CUIConfig.js";
import { configFiles } from "../interfaces/CUIConfig.js";

// Register is used to allow importing both ts and js config files and prevent
// TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"
register();

/**
 * Loads the configuration file "cui.config" from the project,
 * @returns {CUIConfig} Validated configuration object.
 */
export default async function loadConfig(): Promise<CUIConfig> {
  let module;
  for (const configFile of configFiles) {
    try {
      // Resolve absolute path
      const configPath = resolve(process.cwd(), configFile);
      // Import directly with tsx handling
      module = await import(pathToFileURL(configPath).toString());
    } catch {
      continue;
    }
  }
  if (!module)
    throw new Error(
      `
    Config file is missing, please initialise the project
    Run: 
        npx cui init`
    );

  if (!module.default)
    throw new Error(
      "Make sure the export in cui.config file is a default export"
    );

  return module.default as CUIConfig;
}
