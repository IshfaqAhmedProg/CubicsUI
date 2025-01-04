"use server";

import { componentCreationSchema } from "./schema";

export async function createComponentAction(
  prevState: any,
  formdata: FormData
) {
  const validatedFields = componentCreationSchema.safeParse({
    libId: formdata.get("libId"),
    name: formdata.get("name"),
    outPath: formdata.get("outPath"),
    desc: formdata.get("desc"),
    // envs: formdata.getAll("envs"),
    // deps: {
    //   ext: formdata.getAll("deps.ext"),
    //   lcl: formdata.getAll("deps.lcl"),
    // },
    // tags: formdata.getAll("tags"),
  });
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }
  console.log(validatedFields);
}
