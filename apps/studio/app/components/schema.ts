import isValidRelativePath from "@/library/functions/isValidRelativePath";
import { z } from "zod";

export const componentSchema = z.object({
  prId: z.string({ message: "Project Id is not string" }),
  name: z.string().nonempty({ message: "Name cannot be empty" }),
  outPath: z.string().refine((path) => isValidRelativePath(path), {
    message: "Invalid Output path",
  }),
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
export const idSchema = z.record(
  z.string({ message: "Key should be string" }),
  z.string({ message: "Id should be string" })
);
