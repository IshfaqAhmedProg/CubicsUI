"use server";

import db from "@/db";
import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { configurations } from "@cubicsui/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createConfigSchema, updateConfigSchema } from "../../schema";

export async function configsAction(
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

    const configId = formdata.get("configId");
    if (!configId) {
      // Create the config
      const validatedInputs = createConfigSchema.parse({
        name: formdata.get("name"),
        data: formdata.get("data"),
        libId: formdata.get("libId"),
      });
      payload = await db.configurations.create({
        data: validatedInputs,
      });
      console.log("created config:", payload);
    } else if (typeof configId == "string") {
      // Update the config
      const validatedInputs = updateConfigSchema.parse({
        name: formdata.get("name"),
        data: formdata.get("data"),
      });
      payload = await db.configurations.update({
        where: { id: configId },
        data: validatedInputs,
      });
      console.log("updated config:", payload);
      revalidatePath(`/libraries/${libId}`);
      return { status: "success" };
    } else throw new Error("Updating failed as configId is not a string");
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
  redirect(`/libraries/${libId}`);
}
