import CUIConfig, { DetectedConfig } from "../interfaces/CUIConfig.js";
/**
 * Default values matching developer specification
 * @param detectedConfig The configuration detected by the cli
 * @returns The default configuration that is used in cui.config
 */
export const defaultRequiredValues = (
  detectedConfig?: DetectedConfig
): CUIConfig => {
  return {
    env: detectedConfig?.env ?? "react",
    styleEngine: detectedConfig?.styleEngine ?? "css",
    typescript: detectedConfig?.typescript ?? true,
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
export default defineConfig(${JSON.stringify(defaultRequiredValues(detectedConfig))});`;


