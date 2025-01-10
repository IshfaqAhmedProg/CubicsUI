"use server";

import db from "@/db";
import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { redirect } from "next/navigation";



export async function deleteLibraryAction(
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
