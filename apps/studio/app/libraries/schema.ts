import { npmPackageNameRegex } from "@/library/functions/packageNaming";
import { z } from "zod";
import { PJV } from "package-json-validator";

export const libraryCreationSchema = z.object({
  name: z.string().regex(npmPackageNameRegex, {
    message: "Name should follow npm package naming conventions",
  }),
  pkgJson: z
    .record(z.string(), z.any())
    .refine((val) => PJV.validate(JSON.stringify(val), "npm").valid, {
      message: "The package.json data seems to be invalid!",
    }),
  buildConfig: z.record(z.string(), z.any()).optional(),
});
