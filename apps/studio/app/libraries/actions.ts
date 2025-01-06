"use server";

import { redirect } from "next/navigation";
import { createLibrarySchema } from "./schema";
import db from "@/db";
import { revalidatePath } from "next/cache";

export async function createLibraryAction(prevState: any, formdata: FormData) {
  // // Getting input values from formData
  // const [pkgJsonFD, buildConfigFD] = [
  //   formdata.get("pkgJson"),
  //   formdata.get("buildConfig"),
  // ];

  // // Parsing the input values
  // const pkgJson =
  //   typeof pkgJsonFD == "string" ? JSON.parse(pkgJsonFD) : undefined;
  // const buildConfig =
  //   typeof buildConfigFD == "string" ? JSON.parse(buildConfigFD) : undefined;

  // console.log({ pkgJson });
  // Validate inputs
  const validatedInputs = createLibrarySchema.safeParse({
    name: formdata.get("name"),
    lang: formdata.get("lang"),
  });

  if (!validatedInputs.success) {
    console.log(validatedInputs.error);
    return { errors: validatedInputs.error.flatten().fieldErrors };
  }
  // Create the libary in the db
  const libraryFromDB = await db.libraries.create({
    data: validatedInputs.data,
  });

  console.log("lib from db:", libraryFromDB);
  redirect(`/library/${libraryFromDB.id}`);
}
export async function deleteLibraryAction(id: string) {
  try {
    await db.libraries.delete({
      where: {
        id,
      },
    });
    console.log("Succesfully deleted!");
    revalidatePath("/libraries", "page");
  } catch (error) {
    console.error("Delete failed!", error);
  }
}
