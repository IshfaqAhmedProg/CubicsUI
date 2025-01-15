import isValidFilename from "@/library/functions/isValidFileName";
import { z } from "zod";

export const componentCreationSchema = z.object({
  prId: z.string({ message: "Project Id is missing" }),
  name: z.string(),
  outDir: z.string(),
  outFile: z
    .string()
    .refine((arg) => isValidFilename(arg), { message: "Invalid file name" }),
  desc: z.string(),
  tags: z.array(z.string({ message: "Tag should be string" }), {
    message: "Tags should be array",
  }),
  deps: z.object({
    ext: z.array(
      z.object({
        name: z.string(),
        ver: z.string(),
        type: z.string().nullable(),
      })
    ),
    lcl: z.array(
      z.object({
        name: z.string(),
        cmpId: z.string(),
      })
    ),
  }),
});
