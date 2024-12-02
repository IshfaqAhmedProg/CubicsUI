import { execSync } from "child_process";
import generateLibraries from "./functions/generateLibraries";

export const COMPONENTS = ["button", "iconbutton"] as const;
export const FRAMEWORKS = ["react", "svelte", "next"] as const;

export type ComponentName = (typeof COMPONENTS)[number];
export type Framework = (typeof FRAMEWORKS)[number];

(async function main() {
  console.log("⏳ Generating libraries...");
  for (let index = 0; index < FRAMEWORKS.length; index++) {
    const fw = FRAMEWORKS[index];
    for (let index = 0; index < COMPONENTS.length; index++) {
      const cmp = COMPONENTS[index];
      await generateLibraries(cmp, fw);
    }
  }

  try {
    console.log("⏳ Installing dependencies...");
    execSync("pnpm i");
    console.log("✔ Successfully installed dependencies!");

    console.log("⏳ Building libraries...");
    execSync("cd ../../.. && pnpm build");
    console.log("✔ Successfully built libraries!");
  } catch (error) {
    if (error) console.error("✖ Failed to generate libraries.", error);
  }
})();
