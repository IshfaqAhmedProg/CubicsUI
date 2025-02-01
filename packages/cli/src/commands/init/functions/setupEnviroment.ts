import { readFile } from "fs/promises";
import { resolve } from "path";
import writeFile from "@/utils/writeFile.js";
import { envVariables } from "@/constants/defaults.js";

/**
 * Writes or appends environment variables to .env file
 * @returns void
 */
export default async function setupEnvironment() {
  const envFilePath = resolve(process.cwd(), ".env");
  const envFileData = await readFile(envFilePath).catch((err) => {
    if (err.code === "ENOENT") {
      console.warn(
        `.env file not found: ${envFilePath}, Creating new .env file`
      );
    }
  });
  let variablesToAddString = "";
  (Object.keys(envVariables) as (keyof typeof envVariables)[]).forEach(
    (key) =>
      (variablesToAddString =
        variablesToAddString + "\n" + `${key}` + "=" + `"${envVariables[key]}"`)
  );
  const dataToAppend =
    "\n# Environment variables declared in this file are automatically made available to CubicsUI.\n" +
    variablesToAddString;

  if (envFileData?.includes(variablesToAddString)) {
    return;
  }
  await writeFile(envFilePath, dataToAppend, "a");
}
