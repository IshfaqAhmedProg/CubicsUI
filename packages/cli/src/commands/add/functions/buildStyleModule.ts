import { basename, dirname, resolve } from "path";
import getStyleFileName from "./getStyleFileName.js";
import { CUIConfig } from "@/types/CUIConfig.js";
import { ComponentWithCB } from "@/types/Components.js";
import writeFile from "@/utils/writeFile.js";

/**
 * Builds a style module for the component if style is a module
 * @param outPath Resolved outPath of the component
 * @param component Component from database to which the style module belongs
 * @param config Config from `cui.config` file
 */
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
