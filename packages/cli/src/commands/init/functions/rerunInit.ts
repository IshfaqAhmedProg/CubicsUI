import detectPackageManager from "@/utils/detectPackageManager.js";
import { spawn } from "child_process";

export default async function rerunInit() {
  console.log("Re-running `cui init` to apply changes...");

  const pkgManager = await detectPackageManager();

  // Capture original arguments
  const args = process.argv.slice(2); // Exclude `node` and script path
  const filteredArgs = args.filter((arg) => arg !== "init"); // Remove "init" to prevent duplication

  // Spawn a new process to rerun `cui init` with original arguments
  const child = spawn(pkgManager, ["cui", "init", ...filteredArgs], {
    stdio: "inherit", // Inherit stdio so logs appear in the console
    shell: true, // Use shell to ensure compatibility across platforms
  });

  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Re-running init failed with exit code ${code}`);
      process.exit(code || 1);
    }
  });

  return;
}
