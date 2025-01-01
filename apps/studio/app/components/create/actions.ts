"use server";
import db from "@/configs/db";

export async function createComponentAction(formdata: FormData) {
  const name = formdata.get("name");
  const code = formdata.get("code");
  if (typeof name == "string" && typeof code == "string") {
    await db.components.create({
      data: {
        name,
        aliases: [],
        desc: "",
        categories: [],
        supportedEnvs: [],
        code,
      },
    });
  }
}
