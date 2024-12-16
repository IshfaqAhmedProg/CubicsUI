import { CUIConfig } from "./schema.js";

/**
 *  Default values matching developer specification
 */

export const defaultRequiredValues: CUIConfig = {
  env: "react",
  styleEngine: "css",
  typescript: true,
  comments: true,
};

/**
 * Default configuration template for Typescript
 */
export const defaultConfigTemplateTS = `
import { defineConfig } from '@cubicsui/cli/config';

export default defineConfig(${JSON.stringify(defaultRequiredValues)});`;

/**
 * Default configuration template for Javascript
 */
export const defaultConfigTemplateJS = `
const { defineConfig } = require('@cubicsui/cli/config');

module.exports = defineConfig(${JSON.stringify(defaultRequiredValues)});
`;
