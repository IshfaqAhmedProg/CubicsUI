"use server";
import { useDB } from "@/configs/db";
import { v4 } from "uuid";

export async function create(formdata: FormData) {
  const name = formdata.get("name");
  const code = formdata.get("code");
  if (typeof name == "string" && typeof code == "string") {
    (await useDB()).update(({ components }) =>
      components.push({
        id: v4(),
        name,
        aliases: [],
        desc: "",
        categories: [],
        supportedEnvs: [],
        code,
      })
    );
  }
}
