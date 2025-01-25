import { basename, dirname, resolve } from "path";
import createStyleFileName from "./styleFileName.js";
import { writeFile } from "fs/promises";
import { CUIConfig } from "../types/CUIConfig.js";
import { ComponentWithCB } from "../types/Components.js";

export default async function createStyleModule(
  outPath: string,
  component: ComponentWithCB,
  config: CUIConfig
) {
  const styleName = createStyleFileName(basename(outPath), component, config);
  const stylePath = resolve(dirname(outPath), styleName);
  console.log("stylePath", stylePath);
  if (component?.codeblocks?.styles)
    await writeFile(stylePath, component.codeblocks.styles);
  else console.error("Style script not found");
}
