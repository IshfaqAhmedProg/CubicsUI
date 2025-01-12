import { npmPackageNameRegex } from "@/library/functions/packageNaming";
import { z } from "zod";

export const componentCreationSchema = z.object({
  libId: z.string(),
  name: z.string().regex(npmPackageNameRegex, {
    message: "Name should follow npm package naming conventions",
  }),
  // TODO refine outpath so that it only has relative paths or filenames
  outPath: z.string(),
  desc: z.string(),
  code: z.string(),
  // envs: z.array(
  //   z.object({
  //     library: z.string(),
  //     framework: z.string().optional(),
  //   })
  // ),
  // deps: z.object({
  //   ext: z.array(z.string()).default([]),
  //   lcl: z.array(z.string()).default([]),
  // }),
  // tags: z.array(z.string()).default([]),
});
