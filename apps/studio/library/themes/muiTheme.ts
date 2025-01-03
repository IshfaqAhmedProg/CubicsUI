"use client";

import { createTheme } from "@mui/material/styles";
import { colorSchemeDark, colorSchemeLight } from "./muiColorSchemes";
import components from "./muiComponents";

const muiTheme = createTheme({
  cssVariables: { cssVarPrefix: "", colorSchemeSelector: "class" },
  colorSchemes: {
    light: colorSchemeLight,
    dark: colorSchemeDark,
  },
  components,
  spacing: 4,
  shape: { borderRadius: 6 },
  typography: {
    fontFamily: ["var(--font-p)", "var(--font-h)"].join(","),
  },
});

export default muiTheme;
