"use server";

import db from "@/configs/db";

export async function create(formdata: FormData) {
  const name = formdata.get("name");
  const code = formdata.get("code");
  if (typeof name == "string" && typeof code == "string") {
    const component = await db.components.create({
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
