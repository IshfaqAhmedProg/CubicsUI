import { input, select, Separator } from "@inquirer/prompts";
import { npmPackageNameRegex } from "@cubicsui/helpers";
import { Language, StyleExtension } from "@cubicsui/db";
import { db } from "@cubicsui/db";

export default async function () {
  console.log(`Creating new library on ${process.env.DATABASE_URL}`);
  const newLibraryName = await input({
    message:
      "Enter the name for your new library, the library name should follow NPM naming conventions",
    required: true,
    validate(value) {
      const valid = npmPackageNameRegex.test(value);
      if (!valid)
        return "library name should follow npm package naming conventions";
      return true;
    },
  });
  const newLibraryLang: Language = await select({
    message: "Select the language you will be using to define the components.",
    choices: [
      { name: "Javascript", value: "javascript" },
      { name: "Typescript", value: "typescript" },
      new Separator("More coming soon!"),
    ],
  });
  const newLibraryStyleExt: StyleExtension = await select({
    message:
      "Select the style extension that will be used in the style files of the library.",
    choices: [
      { name: ".css", value: "css" },
      { name: ".scss", value: "scss" },
      { name: ".sass", value: "sass" },
      new Separator("More coming soon"),
    ],
  });
  try {
    console.log("⏳ Building library with configurations:", {
      name: newLibraryName,
      language: newLibraryLang,
      styleExtension: newLibraryStyleExt,
    });
    const library = await db.libraries.create({
      data: {
        name: newLibraryName,
        styleExt: newLibraryStyleExt,
        lang: newLibraryLang,
      },
    });
    console.log("Successfully created library!", library.id);
  } catch (error) {
    console.error("Failed to create library!", error);
  }
}
