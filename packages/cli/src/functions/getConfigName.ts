import configFiles from "../constants/configFiles.js";
import { isUsingNextJs, isUsingTypescript } from "./checks.js";

export default function getConfigName() {
  // By default use the "cui.config.mjs" file
  let finalConfigName = configFiles[0];
  // If the detected config is typescript then use "cui.config.ts" instead
  if (isUsingTypescript()) {
    console.log("⚠ tsconfig.json file detected");
    finalConfigName = configFiles[1];
  }
  // Set back to mjs eventhough built with typescript as nextJS doesnt use typescript in runtime
  if (isUsingNextJs()) {
    console.log("⚠ next.config file detected");
    finalConfigName = configFiles[0];
  }

  return finalConfigName;
}
