import { StyleExtension } from "@cubicsui/db";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { CssLogo, SassLogo, TailwindLogo } from "../ui/Brand/Logos";

interface StyleExtWithLogo {
  name: StyleExtension;
  Logo: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

const styleExtWithLogos: StyleExtWithLogo[] = [
  { name: "css", Logo: CssLogo },
  { name: "scss", Logo: SassLogo },
  { name: "sass", Logo: SassLogo },
];
export default styleExtWithLogos;
