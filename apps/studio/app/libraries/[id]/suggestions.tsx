import {
  samplePkgJson,
  sampleTsconfig,
} from "@/library/constants/sampleCodeBlocks";
import { Library, LibraryWithConfigurations } from "@/library/types/Library";
import { Suggestion } from "@/library/types/Suggestions";
import { NodeJSLogo, TypescriptLogo } from "@/library/ui/Brand/Logos";
import { configurations } from "@cubicsui/db";

export function configurationSuggestions(
  library: Library,
  configurations: configurations[]
) {
  const pkgJson: Suggestion = {
    itemName: "package.json",
    title: "Add a package.json",
    icon: <NodeJSLogo />,
    desc: "A package.json file helps CubicsUI assess third-party dependencies used in the library.",
    sample: samplePkgJson(library.name),
  };
  const tsconfig: Suggestion = {
    itemName: "tsconfig.json",
    title: "Add a tsconfig.json",
    icon: <TypescriptLogo />,
    desc: "A tsconfig file helps CubicsUI assess import aliases and other typescript configurations.",
    sample: sampleTsconfig,
  };
  let suggestions: Suggestion[] = [];
  if (!configurations.some((cfg) => cfg.name == "package.json"))
    suggestions.push(pkgJson);

  if (library?.lang == "Typescript") {
    if (!configurations.some((cfg) => cfg.name == "tsconfig.json"))
      suggestions.push(tsconfig);
  }
  return suggestions;
}
