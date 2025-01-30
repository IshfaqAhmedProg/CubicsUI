import { CUIConfig, DetectedConfig } from "../types/CUIConfig.js";

/**
 * Generates the final configuration of the `cui.config` file.
 * The defaults are also defined over here
 * @param detectedConfig The configuration detected by the cli
 * @returns The required values that is used in `cui.config`
 */
export default function configGen(detectedConfig?: DetectedConfig): CUIConfig {
  return {
    env: { library: "react", framework: "none" },
    styleEngine: "css",
    typescript: false,
    rootDir: ".",
    databaseConfig: {
      project: "@cubicsui/lib",
      // TODO Instead of string use env variables
      db: "mongodb+srv://ishfaqahmed:Fm6okdd4FADbgaor@cubicsui.l8bf4.mongodb.net/cubicsuidb?retryWrites=true&w=majority&appName=CubicsUI",
    },
    fileNamingConvention: "CapitalCase",
    dirNamingConvention: "CapitalCase",
    renderComments: "none",
    ...detectedConfig,
  };
}
