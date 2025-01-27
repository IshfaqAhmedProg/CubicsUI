import { program } from "commander";
import init from "./commands/init.js";
import add from "./commands/create.js";

program
  .command("init")
  .option("--ts", "Adds typescript as the value of mode in the config file.")
  .description(
    `Prepares the project for component generation using CubicsUI by creating a configuration file and cache folder \`.cui\` and modifies existing \`.gitignore\` file to ignore \`.cui\` folder.
This function is typically invoked via the \`npx cui init\` command.
    `
  )
  .action(init);

program
  .command("add")
  .description("Adds a component from the database to your project")
  .argument("<component>", "Name of the component")
  .action((component) => add(component));

program.parse(process.argv);
