"use server";

import {
  ActionReturnType,
  FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { Prisma } from "@cubicsui/db";
import { z } from "zod";
import { codeblocksCreationSchema, componentCreationSchema } from "./schema";
import db from "@/db";

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
  let prId = formdata.get("prId");
  if (!prId) return { errors: { Form: "Project Id not found" } };
  try {
    const deps = zipDeps(formdata);
    // console.log(deps);

    // 2. Validate component fields
    const cmpValidatedFields = await componentCreationSchema.parseAsync({
      prId: prId,
      name: formdata.get("name"),
      outPath: formdata.get("outPath"),
      desc: formdata.get("desc"),
      tags: formdata.getAll("tags"),
      deps,
    });
    // 2. Validate code block fields
    const cbValidatedFields = codeblocksCreationSchema.parse({
      script: formdata.get("script"),
      styles: formdata.get("styles"),
    });
    const component = await db.components.create({ data: cmpValidatedFields });
    const codeblocks = await db.codeblocks.create({
      data: { ...cbValidatedFields, cmpId: component.id },
    });
    console.log("Created component and codeblocks");
    return { payload: { ...component, codeblocks }, status: "success" };
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
    return {
      status: "error",
      errors: {
        ...errors,
        FORM: "Oops an error has occured please check your form!",
      },
    };
  }
}
