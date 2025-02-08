"use server";

import db from "@/db";
import { components } from "@cubicsui/db";

export async function getLibraryComponents(
  libId: string,
  /**
   * Id of the component you want to exclude
   */
  excludeComponent?: string
) {
  let libComponents: components[] = [];
  try {
    libComponents = await db.components.findMany({
      where: { libId, id: { not: excludeComponent } },
    });
  } catch (error) {
    console.error(error);
  }
  return libComponents;
}
