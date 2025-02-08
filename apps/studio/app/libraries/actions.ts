"use server";

import { createLibrarySchema, updateLibrarySchema } from "./schema";
import db from "@/db";
import { Prisma } from "@cubicsui/db";
import { z } from "zod";
import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { revalidatePath } from "next/cache";

export async function createLibraryAction(
  prevState: unknown,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  const errors: FormActionReturnType["errors"] = {};
  try {
    // Validate inputs
    const validatedInputs = createLibrarySchema.parse({
      name: formdata.get("name"),
      lang: formdata.get("lang"),
      styleExt: formdata.get("styleExt"),
    });
    // Create the library in the db
    const payload = await db.libraries.create({
      data: validatedInputs,
    });
    console.log("Library from db:", payload);
    revalidatePath("/libraries");
    return { payload, status: "success" };
  } catch (err) {
    console.error(err);
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      errors.name =
        "A component library with the same name exists in the database! Please choose another name.";
    } else if (err instanceof z.ZodError) {
      const fieldErrors = err.flatten().fieldErrors;
      Object.keys(fieldErrors).forEach((field) => {
        errors[field] = fieldErrors[field]?.join("\n");
      });
    }
    return { status: "error", errors };
  }
}
export async function readLibraryAction(id: string | undefined) {
  return await db.libraries.findFirst({ where: { id } });
}
export async function readLibariesAction(take: number, skip: number = 0) {
  return await db.libraries.findMany({ take, skip });
}
export async function deleteLibraryAction(
  prevState: unknown,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  try {
    const libId = formdata.get("libId");
    if (!libId || typeof libId !== "string")
      throw new Error("libId is not defined or of the wrong type");
    await db.libraries.delete({ where: { id: libId } });
    return { status: "success" };
  } catch (error) {
    console.error(error);
    if (error instanceof Error)
      return { status: "error", errors: { formError: error.message } };
  }
}

export async function updateLibraryAction(
  prevState: unknown,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  const errors: FormActionReturnType["errors"] = {};
  try {
    const libId = formdata.get("libId");
    if (!libId || typeof libId !== "string")
      throw new Error("Library id is not defined or the wrong type");

    const validatedInputs = updateLibrarySchema.parse({
      name: formdata.get("name"),
      lang: formdata.get("lang"),
      desc: formdata.get("desc"),
      styleEng: formdata.get("styleEng"),
    });
    const payload = await db.libraries.update({
      where: { id: libId },
      data: validatedInputs,
    });
    revalidatePath(`/libraries/${payload.id}`);
    return { status: "success", payload };
  } catch (err) {
    console.error(err);
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      errors.name =
        "A component library with the same name exists in the database! Please choose another name.";
    } else if (err instanceof z.ZodError) {
      const fieldErrors = err.flatten().fieldErrors;
      Object.keys(fieldErrors).forEach((field) => {
        errors[field] = fieldErrors[field]?.join("\n");
      });
    }
    return { status: "error", errors };
  }
}
