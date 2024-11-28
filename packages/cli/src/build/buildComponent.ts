import { existsSync } from "fs";
import { possibleConfigs } from "./buildConfigFile";

export default async function buildComponent(component: string) {
  const activeConfig = possibleConfigs.find((pc) => existsSync(pc.path));
  if (!activeConfig)
    throw new Error(
      `Config file is missing, please initiate your project
      Run: 
          npx cui init`
    );
  const cuiConfig = require(activeConfig.path);
  console.log(cuiConfig);
  // Check if config  exists

  try {
    console.log(`⏳ Building ${component}, please wait...`);
    console.log(`✔ Created ${component} in the project root.`);
  } catch (error) {
    console.error(`✖ Failed to create ${component}:`, error);
    process.exit(1);
  }
}
