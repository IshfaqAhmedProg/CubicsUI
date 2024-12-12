import { getComponentsCatalog } from "@cubicsui/db";
import generateLibrary from "./functions/generateLibraries.js";
import { execSync } from "child_process";

(async function main() {
  try {
    console.log("⏳ Generating libraries...");
    const catalog = await getComponentsCatalog();
    const components = catalog.data.components;
    for (let index = 0; index < components.length; index++) {
      const component = components[index];
      const pkgEnv = component.pkgEnv;
      for (let index = 0; index < pkgEnv.length; index++) {
        const targetEnv = pkgEnv[index];
        await generateLibrary({ ...component, targetEnv });
      }
    }
    console.log("⏳ Installing dependencies...");
    execSync("pnpm i");
    console.log("✔ Successfully installed dependencies!");
    console.log("⏳ Building libraries...");
    execSync("cd ../../.. && pnpm build");
    console.log("✔ Successfully built libraries!");
  } catch (error) {
    console.error("✖ Failed to generate libraries.", error);
  }
})();
