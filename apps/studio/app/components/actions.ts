"use server";

import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { componentCreationSchema } from "./schema";
import { components, Prisma } from "@cubicsui/db";
import { z } from "zod";

export async function createComponentAction(
  prevState: any,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  let errors: FormActionReturnType["errors"] = {};
  let payload: components;
  try {
    const validatedFields = componentCreationSchema.parse({
      libId: formdata.get("libId"),
      name: formdata.get("name"),
      outPath: formdata.get("outPath"),
      desc: formdata.get("desc"),
      code: formdata.get("code"),
    });

    console.log(validatedFields);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      errors.name =
        "A component with the same name exists in the database! Please choose another name.";
    } else if (err instanceof z.ZodError) {
      const fieldErrors = err.flatten().fieldErrors;
      Object.keys(fieldErrors).forEach((field) => {
        errors[field] = fieldErrors[field]?.join("\n");
      });
    }
    return { status: "error", errors };
  }
}
