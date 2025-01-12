import { StyleEngine } from "@cubicsui/db";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { CssLogo, SassLogo, TailwindLogo } from "../ui/Brand/Logos";

interface StyleEngineWithLogo {
  name: StyleEngine;
  Logo: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

const styleEnginesWithLogos: StyleEngineWithLogo[] = [
  { name: "css", Logo: CssLogo },
  { name: "scss", Logo: SassLogo },
  { name: "tailwindcss", Logo: TailwindLogo },
];
export default styleEnginesWithLogos;
