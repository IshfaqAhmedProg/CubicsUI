import type { CUIConfig } from "../interfaces/CUIConfig.js";
import { DetectedConfig } from "../interfaces/CUIConfig.js";
/**
 * Generates the final configuration of the `cui.config` file.
 * The defaults are also defined over here
 * @param detectedConfig The configuration detected by the cli
 * @returns The required values that is used in `cui.config`
 */
export const configGen = (detectedConfig?: DetectedConfig): CUIConfig => {
  return {
    env: detectedConfig?.env ?? { library: "react", framework: "none" },
    styleEngine: detectedConfig?.styleEngine ?? "css",
    typescript: detectedConfig?.typescript ?? true,
    componentDir: detectedConfig?.componentDir ?? false,
    renderComments: "none",
    fileNamingConvention: "CapitalCase",
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
