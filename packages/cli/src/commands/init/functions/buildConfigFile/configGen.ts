import { CUIConfig, DetectedConfig } from "@/types/CUIConfig.js";

/**
 * Generates the final configuration of the `cui.config` file.
 * The defaults are also defined over here
 * @param detectedConfig The configuration detected by the cli
 * @returns The required values that is used in `cui.config`
 */
export default function configGen(detectedConfig?: DetectedConfig): CUIConfig {
  return {
    envOptions: {
      env: { library: "react", framework: "none" },
      styleExt: "css",
      typescript: false,
      rootDir: ".",
    },
    databaseOptions: {
      libraryName: "@cubicsui/lib",
    },
    ...detectedConfig,
    // styleEngine: "css",
    // renderComments: "none",
    // dirNamingConvention: "CapitalCase",
    // fileNamingConvention: "CapitalCase",
  };
}
