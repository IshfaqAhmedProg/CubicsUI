"use server";

import db from "@/db";
import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { Prisma } from "@cubicsui/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updateProjectSchema } from "../../schema";

export async function updateProjectAction(
  prevState: unknown,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  const errors: FormActionReturnType["errors"] = {};
  try {
    const prId = formdata.get("prId");
    if (!prId || typeof prId !== "string")
      throw new Error("Project id is not defined or the wrong type");

    const validatedInputs = updateProjectSchema.parse({
      name: formdata.get("name"),
      lang: formdata.get("lang"),
      desc: formdata.get("desc"),
      styleEng: formdata.get("styleEng"),
    });
    const payload = await db.projects.update({
      where: { id: prId },
      data: validatedInputs,
    });
    revalidatePath(`/projects/${prId}`);
    return { status: "success", payload };
  } catch (err) {
    console.error(err);
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      errors.name =
        "A project with the same name exists in the database! Please choose another name.";
    } else if (err instanceof z.ZodError) {
      const fieldErrors = err.flatten().fieldErrors;
      Object.keys(fieldErrors).forEach((field) => {
        errors[field] = fieldErrors[field]?.join("\n");
      });
    }
    return { status: "error", errors };
  }
}
