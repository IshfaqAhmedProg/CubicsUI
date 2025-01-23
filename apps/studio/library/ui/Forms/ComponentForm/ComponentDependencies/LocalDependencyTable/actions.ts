"use server";

import db from "@/db";
import { components } from "@cubicsui/db";

export async function getProjectComponents(prId: string, cmpId?: string) {
  let prComponents: components[] = [];
  try {
    prComponents = await db.components.findMany({
      where: { prId, id: { not: cmpId } },
    });
  } catch (error) {
    console.error(error);
  }
  return prComponents;
}
