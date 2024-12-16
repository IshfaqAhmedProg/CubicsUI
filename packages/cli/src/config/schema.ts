import { z } from "zod";

// Define the configuration schema using Zod
const CUIConfigSchema = z.object({
  env: z.enum(["react", "svelte", "next"]),
  /**
   * The style engine that is being used in your project
   */
  styleEngine: z
    .enum(["css", "scss", "tailwind"])
    .describe("The style engine that is being used in your project"),
  typescript: z.boolean().optional().default(true),
  comments: z.boolean().optional().default(false),
});

// Configuration type
export type CUIConfig = z.TypeOf<typeof CUIConfigSchema>;

export default CUIConfigSchema;
