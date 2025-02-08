"use server";

import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { codeblocks, components } from "@cubicsui/db";
import { z } from "zod";
import { codeblocksSchema, componentSchema } from "./schema";
import db from "@/db";
import { revalidatePath } from "next/cache";
import { isPrismaClientKnownRequestError } from "@/library/functions/isPrismaClientKnownRequestError";

export async function zipDeps(formdata: FormData) {
  const extNames = formdata.getAll("depsExtName");
  const extVers = formdata.getAll("depsExtVer");
  const extTypes = formdata.getAll("depsExtType");
  const lclNames = formdata.getAll("depsLclName");
  const lclCmpIds = formdata.getAll("depsLclCmpId");

  const lcl = lclNames.map((name, i) => {
    return { name, cmpId: lclCmpIds[i] };
  });
  const ext = extNames.map((name, i) => {
    return {
      name,
      ver: extVers[i],
      type: extTypes[i] != "normal" ? extTypes[i] : null,
    };
  });

  return { lcl, ext };
}
type SaveComponentActionReturnType = {
  codeblocks: codeblocks;
} & components;

export async function saveComponentAction(
  prevState: unknown,
  formdata: FormData
): ActionReturnType<FormActionReturnType<SaveComponentActionReturnType>> {
  const errors: FormActionReturnType["errors"] = {};
  const libId = formdata.get("libId");

  if (!libId || typeof libId !== "string")
    return {
      status: "error",
      errors: { formError: "Library Id is not defined" },
    };
  try {
    const component = await saveComponent(libId, formdata);
    const codeblocks = await saveCodeblock(component.id, formdata);
    revalidatePath(`/libraries/${libId}`);
    return { payload: { ...component, codeblocks }, status: "success" };
  } catch (err) {
    if (isPrismaClientKnownRequestError(err) && err.code === "P2002") {
      errors.formError = `A component with the same name or output path exists in the libraries! Please choose another name or output path.`;
    } else if (err instanceof z.ZodError) {
      const fieldErrors = err.flatten().fieldErrors;
      Object.keys(fieldErrors).forEach((field) => {
        errors[field] = fieldErrors[field]?.join("\n");
      });
    }
    console.log(err);
    return {
      status: "error",
      errors: {
        formError: "Oops an error has occured please check your form!",
        ...errors,
      },
    };
  }
}
export async function saveComponent(libId: string, formdata: FormData) {
  const cmpId = formdata.get("cmpId");
  try {
    const deps = await zipDeps(formdata);
    const cmpValidatedFields = componentSchema.parse({
      libId: libId,
      name: formdata.get("name"),
      outPath: formdata.get("outPath"),
      desc: formdata.get("desc"),
      tags: formdata.getAll("tags"),
      deps,
    });
    const component =
      typeof cmpId == "string"
        ? await db.components.update({
            where: { id: cmpId },
            data: cmpValidatedFields,
          })
        : await db.components.create({
            data: cmpValidatedFields,
          });
    return component;
  } catch (error) {
    throw error;
  }
}
export async function saveCodeblock(cmpId: string, formdata: FormData) {
  try {
    const cbId = formdata.get("cbId");
    const cbValidatedFields = codeblocksSchema.parse({
      cmpId,
      script: formdata.get("script"),
      styles: formdata.get("styles"),
    });
    const codeblock =
      typeof cbId == "string"
        ? await db.codeblocks.update({
            where: { id: cbId },
            data: cbValidatedFields,
          })
        : await db.codeblocks.create({
            data: cbValidatedFields,
          });
    return codeblock;
  } catch (error) {
    throw error;
  }
}
export async function deleteComponent(
  prevState: unknown,
  formdata: FormData
): ActionReturnType<FormActionReturnType<components>> {
  const id = formdata.get("cmpId");
  try {
    if (!id || typeof id !== "string")
      throw new Error("Component Id not found!");
    const payload = await db.components.delete({ where: { id } });
    return { status: "success", payload };
  } catch (error) {
    console.error(error);
    return { status: "error" };
  }
}
