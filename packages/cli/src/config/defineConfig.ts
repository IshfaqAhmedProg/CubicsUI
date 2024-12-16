import CUIConfig from "../interfaces/CUIConfig.js";
import { defaultRequiredValues } from "../constants/config.js";

/**
 * Define and validate CubicsUI configuration
 * @param config Partial configuration object
 * @returns Validated configuration
 */
export default function defineConfig(config: CUIConfig): CUIConfig {
  // Merging default values with provided config
  const mergedConfig = { ...defaultRequiredValues, ...config };
  // Validating the merged configuration
  return mergedConfig;
}
