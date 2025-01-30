import isValidCliName from "@/library/functions/isValidCliName";
import isValidRelativePath from "@/library/functions/isValidRelativePath";
import { z } from "zod";

export const componentSchema = z.object({
  prId: z.string({ message: "Project Id is not string" }),
  name: z
    .string()
    .nonempty({ message: "Component Name cannot be empty." })
    .regex(isValidCliName, {
      message: "Names should be short and should not start with '_' or '-'.",
    }),
  outPath: z.string().refine((path) => isValidRelativePath(path), {
    message: "Invalid Output path",
  }),
  desc: z.string(),
  tags: z.array(z.string().nonempty("Tag should not be empty string"), {
    message: "Tags should be array",
  }),
  deps: z.object({
    ext: z.array(
      z.object({
        name: z
          .string()
          .nonempty({ message: "Dependency Name cannot be empty" }),
        ver: z.string().startsWith("@", {
          message: "Versions should always start with @",
        }),
        type: z.string().nullable(),
      })
    ),
    lcl: z.array(
      z.object({
        // TODO rename to path
        name: z.string().nonempty({
          message: "Relative paths cannot be empty",
        }),
        cmpId: z.string(),
      })
    ),
  }),
});

export const codeblocksSchema = z.object({
  cmpId: z.string({ message: "Component Id is not string" }),
  script: z.string({ message: "Script is missing" }),
  styles: z.string().nullish(),
});
