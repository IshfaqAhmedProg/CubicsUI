"use server";

import db from "@/db";
import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { redirect } from "next/navigation";

export async function deleteProjectAction(
  prevState: any,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  try {
    const prId = formdata.get("prId");
    if (!prId || typeof prId !== "string")
      throw new Error("prId is not defined or of the wrong type");
    await db.projects.delete({ where: { id: prId } });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) return { errors: { Form: error.message } };
  }
  redirect("/projects");
}
