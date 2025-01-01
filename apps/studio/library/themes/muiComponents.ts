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
      root: { borderRadius: "var(--shape-borderRadius)" },
    },
  },
  MuiPaper: { defaultProps: { elevation: 0 } },
};
export default components;
