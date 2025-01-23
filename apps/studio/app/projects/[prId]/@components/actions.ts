"use server";

import db from "@/db";
import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { revalidatePath } from "next/cache";

export async function deleteComponentAction(
  id: string
): ActionReturnType<FormActionReturnType> {
  try {
    const component = await db.components.delete({ where: { id } });
    console.log("Successfully deleted component with id:", id);
    revalidatePath(`/projects/${component.prId}`);
    return { status: "success", payload: component };
  } catch (error) {
    console.error("Failed to delete component with id:", id, error);
    return { status: "error" };
  }
}
