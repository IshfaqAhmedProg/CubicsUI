import { z } from "zod";
import CUIConfigSchema, { CUIConfig } from "./schema.js";
import { defaultRequiredValues } from "./defaults.js";

/**
 * Define and validate CubicsUI configuration
 * @param config Partial configuration object
 * @returns Validated configuration
 */
export default function defineConfig(config: CUIConfig): CUIConfig {
  try {
    // Merging default values with provided config
    const mergedConfig = { ...defaultRequiredValues, ...config };

    // Validating the merged configuration
    return CUIConfigSchema.parse(mergedConfig);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(
        "Configuration Validation Error:",
        error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("\n")
      );
      throw new Error("Invalid CubicsUI configuration");
    }
    throw error;
  }
}
