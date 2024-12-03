import LPC from "@cubicsui/db/library-packages-catalog.json";
import generateLibrary from "./functions/generateLibraries";
import { execSync } from "child_process";
import { PackageFramework, PackageName } from "./interfaces/Library";

(async function main() {
  console.log("⏳ Generating libraries...");

  const frameworks = Object.keys(LPC) as PackageFramework[];
  for (let index = 0; index < frameworks.length; index++) {
    const pkgFramework = frameworks[index];
    const pkgNames = Object.keys(LPC[pkgFramework]) as PackageName[];
    for (let index = 0; index < pkgNames.length; index++) {
      const pkgName = pkgNames[index];
      await generateLibrary({ pkgFramework, pkgName });
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
