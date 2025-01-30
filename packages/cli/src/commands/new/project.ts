import { input, select, Separator } from "@inquirer/prompts";
import loadConfig from "../../functions/loadConfig.js";
import { npmPackageNameRegex } from "@cubicsui/helpers";
import { Language, StyleExtension } from "@cubicsui/db";
import { db } from "@cubicsui/db";

export default async function newProject() {
  const config = await loadConfig();
  console.log(
    `Creating new project on ${JSON.stringify(config.databaseConfig.db)}`
  );
  const newProjectName = await input({
    message:
      "Enter the name for your new project, the project name should follow NPM naming conventions",
    required: true,
    validate(value) {
      const valid = npmPackageNameRegex.test(value);
      if (!valid)
        return "Project name should follow npm package naming conventions";
      return true;
    },
  });
  const newProjectLang: Language = await select({
    message: "Select the language you will be using to define the components.",
    choices: [
      { name: "Javascript", value: "javascript" },
      { name: "Typescript", value: "typescript" },
      new Separator("More coming soon!"),
    ],
  });
  const newProjectStyleExt: StyleExtension = await select({
    message:
      "Select the style extension that will be used in the style files of the project.",
    choices: [
      { name: ".css", value: "css" },
      { name: ".scss", value: "scss" },
      { name: ".sass", value: "sass" },
      new Separator("More coming soon"),
    ],
  });
  try {
    console.log("⏳ Building project with configurations:", {
      name: newProjectName,
      language: newProjectLang,
      styleExtension: newProjectStyleExt,
    });
    const project = await db.projects.create({
      data: {
        name: newProjectName,
        styleExt: newProjectStyleExt,
        lang: newProjectLang,
      },
    });
    console.log("Successfully created project!", project.id);
  } catch (error) {
    console.error("Failed to create project!", error);
  }
}
