"use server";

import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { codeblocks, components, Prisma } from "@cubicsui/db";
import { z } from "zod";
import { codeblocksSchema, componentSchema } from "./schema";
import db from "@/db";

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
  const prId = formdata.get("prId");

  if (!prId || typeof prId !== "string")
    return {
      status: "error",
      errors: { formError: "Project Id is not defined" },
    };
  try {
    const component = await saveComponent(prId, formdata);
    const codeblocks = await saveCodeblock(component.id, formdata);
    return { payload: { ...component, codeblocks }, status: "success" };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      errors.formError = `A component with the same name or output path exists in the project! Please choose another name or output path.`;
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
export async function saveComponent(prId: string, formdata: FormData) {
  const cmpId = formdata.get("cmpId");
  try {
    const deps = await zipDeps(formdata);
    const cmpValidatedFields = componentSchema.parse({
      prId,
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
  if (!id || typeof id !== "string") throw new Error("Component Id not found!");
  const payload = await db.components.delete({ where: { id } });
  return { status: "success", payload };
}
