import type { Components, CssVarsTheme, Theme } from "@mui/material";

const components:
  | Components<Omit<Theme, "components" | "palette"> & CssVarsTheme>
  | undefined = {
  MuiBreadcrumbs: {
    styleOverrides: {
      ol: {
        flexWrap: "nowrap",
      },
    },
  },
  MuiButton: {
    defaultProps: { size: "small" },
    styleOverrides: {
      root: {
        transition: "all 0.3s var(--transition-tf)",
        fontSize: "1em",
        textTransform: "none",
        fontWeight: "bold",
        padding: "",
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: "none",
        color: "inherit",
      },
    },
  },
  MuiListItem: { defaultProps: { disablePadding: true } },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        transition: "all 0.3s var(--transition-tf)",
        borderRadius: "var(--shape-borderRadius)",
        fontFamily: "var(--font-h)",
        gap: "0.5rem",
      },
    },
  },
  MuiPaper: { defaultProps: { elevation: 0 } },
};
export default components;
