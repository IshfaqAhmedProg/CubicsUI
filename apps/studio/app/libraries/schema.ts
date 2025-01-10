import { npmPackageNameRegex } from "@/library/functions/packageNaming";
import { z } from "zod";

export const createLibrarySchema = z.object({
  name: z.string().regex(npmPackageNameRegex, {
    message: "Name should follow npm package naming conventions",
  }),
  lang: z.enum(["Javascript", "Typescript"]),
});
export const createConfigSchema = z.object({
  name: z.string({ message: "Please enter a name for the configuration." }),
  data: z.string({ message: "The configuration should be text." }),
  libId: z.string(),
});
export const updateLibrarySchema = createLibrarySchema.extend({
  desc: z.string().optional(),
});
