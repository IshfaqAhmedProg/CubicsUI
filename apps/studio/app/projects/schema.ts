import { npmPackageNameRegex } from "@cubicsui/helpers";
import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string({ message: "Name should always be string" })
    .regex(npmPackageNameRegex, {
      message: "Name should follow npm package naming conventions",
    }),
  lang: z.enum(["typescript", "javascript"]),
  styleExt: z.enum(["css", "scss", "sass"]),
});
export const createConfigSchema = z.object({
  name: z.string({ message: "Please enter a name for the configuration." }),
  data: z.string({ message: "The configuration should be text." }),
  prId: z.string(),
});
export const updateProjectSchema = createProjectSchema.extend({
  desc: z.string().optional(),
});
export const updateConfigSchema = createConfigSchema.extend({
  prId: z.string().optional(),
});
