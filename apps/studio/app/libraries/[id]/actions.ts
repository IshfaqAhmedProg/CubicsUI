"use server";

import db from "@/db";
import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { configurations } from "@cubicsui/db";
import { redirect } from "next/navigation";
import { z } from "zod";

const createConfigSchema = z.object({
  name: z.string({ message: "Please enter a name for the configuration." }),
  data: z.string({ message: "The configuration should be text." }),
  libId: z.string(),
});
export async function createConfigsAction(
  prevState: any,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  let errors: FormActionReturnType["errors"] = {};
  let payload: configurations;
  let libId: any;
  try {
    // Validate inputs
    libId = formdata.get("libId");
    if (!libId || typeof libId !== "string")
      throw new Error("Library id is not defined");

    const validatedInputs = createConfigSchema.parse({
      name: formdata.get("name"),
      data: formdata.get("data"),
      libId: formdata.get("libId"),
    });
    // Create the library in the db
    payload = await db.configurations.create({
      data: validatedInputs,
    });
  } catch (err) {
    console.error(err);
    if (err instanceof z.ZodError) {
      const fieldErrors = err.flatten().fieldErrors;
      Object.keys(fieldErrors).forEach((field) => {
        errors[field] = fieldErrors[field]?.join("\n");
      });
    }
    return { status: "error", errors };
  }
  console.log("created config:", payload);
  redirect(`/libraries/${libId}`);
}

export async function deleteLibrary(
  prevState: any,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  try {
    const id = formdata.get("libId");
    if (!id || typeof id !== "string")
      throw new Error("libId is not defined or of the wrong type");
    await db.libraries.delete({ where: { id } });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) return { errors: { Form: error.message } };
  }
  redirect("/libraries");
}
