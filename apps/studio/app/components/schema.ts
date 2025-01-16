import isValidFilename from "@/library/functions/isValidFileName";
import { z } from "zod";

export const componentCreationSchema = z.object({
  prId: z.string({ message: "Project Id is missing" }),
  name: z.string().nonempty({ message: "Name cannot be empty" }),
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
        name: z.string().nonempty({ message: "Name cannot be empty" }),
        ver: z
          .string()
          .startsWith("@", { message: "Versions should always start with @" })
          .min(2, { message: "Version is too short" }),
        type: z.string().nullable(),
      })
    ),
    lcl: z.array(
      z.object({
        name: z.string().min(1, { message: "Name cannot be empty" }),
        cmpId: z.string().min(1, { message: "Component Id cannot be empty" }),
      })
    ),
  }),
});
export const codeblocksCreationSchema = z.object({
  script: z.string({ message: "Script is missing" }),
  styles: z.string().nullish(),
});
export const codeblockUpdateSchema = codeblocksCreationSchema.extend({
  id: z.string({ message: "Codeblock Id is missing" }),
  cmpId: z.string({ message: "Component Id is missing" }),
});
