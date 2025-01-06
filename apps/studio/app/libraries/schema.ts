import { npmPackageNameRegex } from "@/library/functions/packageNaming";
import { z } from "zod";

export const createLibrarySchema = z.object({
  name: z.string().regex(npmPackageNameRegex, {
    message: "Name should follow npm package naming conventions",
  }),
  lang: z.enum(["Javascript", "Typescript"]),
});
export const createConfigurationSchema = z.object({
  name: z.string(),
  data: z.string(),
});
export const createPackageJsonSchema = z.object({
  name: z.enum(["package.json"], {
    message: "Name should always be package.json",
  }),
  data: z.string(),
});
export const createTsconfigSchema = z.object({
  name: z.enum(["tsconfig.json"], {
    message: "Name should always be tsconfig.json",
  }),
  data: z.string(),
});
