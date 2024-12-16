import { resolve } from "path";
import { defaultConfigTemplateTS } from "./defaults.js";
import { register } from "tsx/esm/api";
import { pathToFileURL } from "url";
import { CUIConfig } from "./schema.js";

export type Configs = {
  name: "cui.config.js" | "cui.config.ts";
  content: string;
};

// Register is used to allow importing both ts and js config files
register();

export const configFiles: Configs[] = [
  {
    name: "cui.config.js",
    content: defaultConfigTemplateTS,
  },
  {
    name: "cui.config.ts",
    content: defaultConfigTemplateTS,
  },
];

export default async function loadConfig() {
  let module;

  for (const configFile of configFiles) {
    try {
      // Resolve absolute path
      const configPath = resolve(process.cwd(), configFile.name);
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
