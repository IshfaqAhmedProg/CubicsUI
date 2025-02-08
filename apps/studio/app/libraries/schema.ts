import { npmPackageNameRegex } from "@cubicsui/helpers";
import { z } from "zod";

export const createLibrarySchema = z.object({
  name: z
    .string({ message: "Name should always be string" })
    .regex(npmPackageNameRegex, {
      message: "Name should follow npm package naming conventions",
    }),
  lang: z.enum(["typescript", "javascript"]),
  styleExt: z.enum(["css", "scss", "sass"]),
});
export const updateLibrarySchema = createLibrarySchema.extend({
  desc: z.string().optional(),
});
