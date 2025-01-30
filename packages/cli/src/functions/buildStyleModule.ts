import { basename, dirname, resolve } from "path";
import getStyleFileName from "./getStyleFileName.js";
import { CUIConfig } from "../types/CUIConfig.js";
import { ComponentWithCB } from "../types/Components.js";
import writeFile from "./writeFile.js";

export default async function buildStyleModule(
  outPath: string,
  component: ComponentWithCB,
  config: CUIConfig
) {
  const styleName = getStyleFileName(basename(outPath), component, config);
  const stylePath = resolve(dirname(outPath), styleName);
  if (component?.codeblocks?.styles && component.codeblocks?.styles !== "")
    await writeFile(stylePath, component.codeblocks.styles);
  else
    console.error(
      `❌ Style script not found. 
      Looks like you've linked your styles to a module, but forgot to add in the styles definitions`
    );
  console.log(`✔ Created style file ${styleName}`);
}
