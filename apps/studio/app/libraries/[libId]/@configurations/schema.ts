import { z } from "zod";

export const createConfigSchema = z.object({
  name: z.string({ message: "Please enter a name for the configuration." }),
  data: z.string({ message: "The configuration should be text." }),
  libId: z.string(),
});
export const updateConfigSchema = createConfigSchema.extend({
  libId: z.string().optional(),
});
