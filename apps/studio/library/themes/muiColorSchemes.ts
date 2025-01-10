import {
  ColorSystemOptions,
  PaletteColorOptions,
  PaletteOptions,
} from "@mui/material";

const primaryColor: PaletteColorOptions = {
  main: "rgb(68,68,255)",
};
const secondaryColor: PaletteColorOptions = {
  main: "rgb(245,0,87)",
};
const schemeCommons: PaletteOptions = {
  primary: primaryColor,
  secondary: secondaryColor,
};

export const colorSchemeLight: ColorSystemOptions = {
  palette: {
    ...schemeCommons,
    divider: "rgba(0,0,0,0.2)",
    background: {
      default: "rgb(255,250,250)",
      paper: "rgba(235,235,235,0.6)",
    },
    text: {
      primary: "rgb(35,35,35)",
      secondary: "rgb(35,35,35,0.8)",
      disabled: "rgba(35,35,35,0.5)",
    },
    Skeleton: {
      bg: "rgba(235,235,235,0.6)",
    },
  },
};
export const colorSchemeDark: ColorSystemOptions = {
  palette: {
    ...schemeCommons,
    divider: "rgba(255,255,255,0.2)",
    background: {
      paper: "rgba(23,23,23,0.6)",
    },
    text: {
      primary: "rgb(240,240,240)",
      secondary: "rgb(240,240,240,0.5)",
      disabled: "rgba(240,240,240,0.2)",
    },
    Skeleton: {
      bg: "rgba(23,23,23,0.6)",
    },
  },
};
