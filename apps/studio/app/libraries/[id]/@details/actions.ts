"use server";

import db from "@/db";
import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { Prisma } from "@cubicsui/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updateLibrarySchema } from "../../schema";
import { Library } from "@/library/types/Library";

export async function updateLibraryAction(
  prevState: any,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  let errors: FormActionReturnType["errors"] = {};
  let payload: Library;
  try {
    const libId = formdata.get("libId");
    if (!libId || typeof libId !== "string")
      throw new Error("Library id is not defined or the wrong type");

    const validatedInputs = updateLibrarySchema.parse({
      name: formdata.get("name"),
      lang: formdata.get("lang"),
      desc: formdata.get("desc"),
    });
    payload = await db.libraries.update({
      where: { id: libId },
      data: validatedInputs,
    });
    revalidatePath(`/libraries/${libId}`);
  } catch (err) {
    console.error(err);
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      errors.name =
        "A library with the same name exists in the database! Please choose another name.";
    } else if (err instanceof z.ZodError) {
      const fieldErrors = err.flatten().fieldErrors;
      Object.keys(fieldErrors).forEach((field) => {
        errors[field] = fieldErrors[field]?.join("\n");
      });
    }
    return { status: "error", errors };
  }
}
