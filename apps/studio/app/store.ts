"use server";

import { Prisma } from "@cubicsui/db";

let tempLibraryStore: { [key: string]: any } = {};

export async function setTempLibrary(
  library: Prisma.$librariesPayload["scalars"]
) {
  tempLibraryStore[library.id] = library;
}

export async function getTempLibrary(id: string) {
  return tempLibraryStore[id];
}
