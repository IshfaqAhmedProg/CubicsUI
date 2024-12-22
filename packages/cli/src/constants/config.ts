import CUIConfig from "../interfaces/CUIConfig.js";
import { DetectedConfig } from "../interfaces/CUIConfig.js";
/**
 * Generates the final configuration of the `cui.config` file.
 * The defaults are also defined over here
 * @param detectedConfig The configuration detected by the cli
 * @returns The required values that is used in `cui.config`
 */
export const configGen = (detectedConfig?: DetectedConfig): CUIConfig => {
  return {
    env: { library: "react", framework: "none" },
    styleEngine: "css",
    typescript: false,
    ...detectedConfig,
    fileNamingConvention: "CapitalCase",
    renderComments: "none",
  };
};

/**
 * Default configuration template for ESM modules
 * @param detectedConfig The configuration detected by the cli
 * @returns The template that will be used to build `cui.config`
 */
export const configTemplateESM = (detectedConfig: DetectedConfig): string => `
import { defineConfig } from '@cubicsui/cli/config';
export default defineConfig(${JSON.stringify(configGen(detectedConfig))});`;
