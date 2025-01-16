"use server";

import { createProjectSchema } from "./schema";
import db from "@/db";
import { Prisma } from "@cubicsui/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { Project } from "@/library/types/Project";

export async function createProjectAction(
  prevState: any,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  let errors: FormActionReturnType["errors"] = {};
  let payload: Project;
  try {
    // Validate inputs
    const validatedInputs = createProjectSchema.parse({
      name: formdata.get("name"),
      lang: formdata.get("lang"),
      styleEng: formdata.get("styleEng"),
    });
    // Create the library in the db
    payload = await db.projects.create({
      data: validatedInputs,
    });
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
  console.log("lib from db:", payload);
  redirect(`/projects/${payload.id}`);
}
