import { NodeJSLogo, TypescriptLogo } from "@/library/ui/Brand/Logos";

export const knownConfigurations = {
  packageJson: {
    itemName: "package.json",
    title: "Add a package.json",
    icon: <NodeJSLogo />,
    desc: "A package.json file helps CubicsUI assess third-party dependencies used in the library.",
  },
  tsconfigJson: {
    itemName: "tsconfig.json",
    title: "Add a tsconfig.json",
    icon: <TypescriptLogo />,
    desc: "A tsconfig file helps CubicsUI assess import aliases and other typescript configurations.",
  },
};
