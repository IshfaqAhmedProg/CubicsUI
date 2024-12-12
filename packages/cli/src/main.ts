import { program } from "commander";
import init from "./commands/init.js";
import create from "./commands/create.js";

program
  .command("init")
  .option("--ts", "Adds typescript as the value of mode in the config file.")
  .description("Initialize a new @studicubics/cli configuration")
  .action(init);

program
  .command("create")
  .description("Creates a component based on what argument is provided")
  .argument("<component>", "component to create")
  .action((component) => create(component));

program.parse(process.argv);
