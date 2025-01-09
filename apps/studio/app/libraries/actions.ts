"use server";

import { createLibrarySchema } from "./schema";
import db from "@/db";
import { revalidatePath } from "next/cache";
import { libraries, Prisma } from "@cubicsui/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";

export async function createLibraryAction(
  prevState: any,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  let errors: FormActionReturnType["errors"] = {};
  let payload: libraries;
  try {
    // Validate inputs
    const validatedInputs = createLibrarySchema.parse({
      name: formdata.get("name"),
      lang: formdata.get("lang"),
    });
    // Create the library in the db
    payload = await db.libraries.create({
      data: validatedInputs,
    });
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
  console.log("lib from db:", payload);
  redirect(`/libraries/${payload.id}`);
}

export async function deleteLibrariesAction(formdata: FormData) {
  try {
    const ids = formdata.getAll("librariesIds");
    if (!ids || ids.length == 0) throw new Error("No ids selected");
    console.log(ids);
    // await db.libraries.delete({
    //   where: {
    //     id,
    //   },
    // });
    console.log("Succesfully deleted!");
    // revalidatePath("/libraries", "page");
  } catch (error) {
    console.error("Delete failed!", error);
  }
}
