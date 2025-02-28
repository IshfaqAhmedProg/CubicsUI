import { DetectedConfig } from "../types/CUIConfig.js";
import configGen from "./configGen.js";

/**
 * Default configuration template for ESM modules
 * @param detectedConfig The configuration detected by the cli
 * @returns The template that will be used to build `cui.config`
 */

export const configTemplateESM = (detectedConfig: DetectedConfig): string => `
import { defineConfig } from '@cubicsui/cli';
export default defineConfig(${JSON.stringify(configGen(detectedConfig))});`;
