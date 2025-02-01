import { components } from "@cubicsui/db";
import { basename, extname } from "path";
import { CUIConfig } from "../types/CUIConfig.js";

export default function getStyleFileName(
  fileName: string,
  component: components,
  config: CUIConfig
) {
  // Check if the component is using style as a module, style will be a module if any lcl dependency in the
  // component has a cmpId of styles
  let styleFileName = component.deps.lcl.find(
    (dep) => dep.cmpId === "styles"
  )?.name;

  // orelse create a new style file from the component name and adding the extension from user config
  if (!styleFileName) {
    styleFileName =
      basename(fileName, extname(fileName)) +
      `.module.${config.envOptions.styleExt}`;
  }

  return styleFileName;
}
