import { Language } from "@cubicsui/db";

import { JavascriptLogo, TypescriptLogo } from "./../ui/Brand/Logos";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
interface SupportedLanguageWithIcon {
  name: Language;
  Logo: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

const supportedLanguageWithIcons: SupportedLanguageWithIcon[] = [
  { name: "javascript", Logo: JavascriptLogo },
  { name: "typescript", Logo: TypescriptLogo },
];
export default supportedLanguageWithIcons;
