"use server";

import db from "@/db";
import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { z } from "zod";
import { createConfigSchema as configSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { configurations } from "@cubicsui/db";

export async function saveConfigAction(
  prevState: unknown,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  const errors: FormActionReturnType["errors"] = {};
  // Validate inputs
  const libId = formdata.get("libId");
  const configId = formdata.get("configId");

  try {
    if (!libId || typeof libId !== "string")
      throw new Error("Library id is not defined");
    // Create the config
    const validatedInputs = configSchema.parse({
      name: formdata.get("name"),
      data: formdata.get("data"),
      libId: formdata.get("libId"),
    });
    const payload =
      typeof configId == "string"
        ? await db.configurations.update({
            where: { id: configId },
            data: validatedInputs,
          })
        : await db.configurations.create({
            data: validatedInputs,
          });
    console.log("Saved config:", payload);
    revalidatePath(`/libraries/${payload.libId}`);
    return { status: "success", payload };
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
}
export async function deleteConfigurations(
  prevState: unknown,
  formdata: FormData
): ActionReturnType<FormActionReturnType<configurations>> {
  const id = formdata.get("cfgId");
  try {
    if (!id || typeof id !== "string")
      throw new Error("Configuration Id not found!");
    const payload = await db.configurations.delete({ where: { id } });
    revalidatePath(`/libaries/${payload.libId}`);
    return { status: "success", payload };
  } catch (error) {
    console.error(error);
    return { status: "error" };
  }
}
