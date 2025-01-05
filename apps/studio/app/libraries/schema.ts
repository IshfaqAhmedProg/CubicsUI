import { npmPackageNameRegex } from "@/library/functions/packageNaming";
import { z } from "zod";
import validatePackageJson from "@/library/functions/validatePackageJson";

export const libraryCreationSchema = z.object({
  name: z.string().regex(npmPackageNameRegex, {
    message: "Name should follow npm package naming conventions",
  }),
  flavor: z.enum(["Vanilla", "Typescript"]),
  pkgJson: z.record(z.string(), z.any()).refine(validatePackageJson, {
    message: "The package.json data seems to be invalid!",
  }),
  buildConfig: z.record(z.string(), z.any()).optional(),
});
