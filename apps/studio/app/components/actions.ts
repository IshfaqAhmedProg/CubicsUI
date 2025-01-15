"use server";

import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { components, Prisma } from "@cubicsui/db";
import { z } from "zod";
import { componentCreationSchema } from "./schema";

function zipDeps(formdata: FormData) {
  const extNames = formdata.getAll("depsExtName");
  const extVers = formdata.getAll("depsExtVer");
  const extTypes = formdata.getAll("depsExtType");
  const lclNames = formdata.getAll("depsLclName");
  const lclCmpIds = formdata.getAll("depsLclCmpId");

  let lcl = lclNames.map((name, i) => {
      return { name, cmpId: lclCmpIds[i] };
    }),
    ext = extNames.map((name, i) => {
      return {
        name,
        ver: extVers[i],
        type: extTypes[i] != "normal" ? extTypes[i] : null,
      };
    });

  return { lcl, ext };
}

export async function createComponentAction(
  prevState: any,
  formdata: FormData
): ActionReturnType<FormActionReturnType> {
  let errors: FormActionReturnType["errors"] = {};
  let payload: components;
  try {
    const deps = zipDeps(formdata);
    console.log(deps);
    const validatedFields = componentCreationSchema.parse({
      prId: formdata.get("prId"),
      name: formdata.get("name"),
      outDir: formdata.get("outDir"),
      outFile: formdata.get("outFile"),
      desc: formdata.get("desc"),
      tags: formdata.getAll("tags"),
      deps,
    });
    console.log(validatedFields);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      errors.name =
        "A component with the same name exists in the database! Please choose another name.";
    } else if (err instanceof z.ZodError) {
      const fieldErrors = err.flatten().fieldErrors;
      Object.keys(fieldErrors).forEach((field) => {
        errors[field] = fieldErrors[field]?.join("\n");
      });
    }
    console.log(err);
    return { status: "error", errors };
  }
}
