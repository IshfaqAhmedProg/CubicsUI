"use server";

import db from "@/db";
import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";

export async function deleteProjectAction(
  prevState: unknown,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  try {
    const prId = formdata.get("prId");
    if (!prId || typeof prId !== "string")
      throw new Error("prId is not defined or of the wrong type");
    await db.projects.delete({ where: { id: prId } });
    return { status: "success" };
  } catch (error) {
    console.error(error);
    if (error instanceof Error)
      return { status: "error", errors: { formError: error.message } };
  }
}
