import { program } from "commander";
import init from "./commands/init.js";
import add from "./commands/add.js";
import { commandDesc } from "./constants/descriptions.js";
import newComponent from "./commands/new/component.js";
import newProject from "./commands/new/project.js";

// Consumer commands
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

// Provider commands
const newCommand = program.command("new");

newCommand
  .command("component")
  .description(commandDesc.new.component)
  .argument("<filepath>", "Path of the file you want to upload")
  .action((filepath) => newComponent(filepath));

newCommand
  .command("project")
  .description(commandDesc.new.project)
  .action(newProject);

program.parse(process.argv);
