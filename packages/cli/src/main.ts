import { program } from "commander";
import init from "./commands/init.js";
import add from "./commands/add.js";
import { commandDesc } from "./constants/descriptions.js";

program
  .command("init")
  .option(
    "-ts, --typescript",
    "Adds typescript as the value of mode in the config file."
  )
  .description(commandDesc.init)
  .action((options) => init(options));

program
  .command("add")
  .description(commandDesc.add)
  .argument("<componentName>", "Name of the component")
  .action((component) => add(component));

program.parse(process.argv);
