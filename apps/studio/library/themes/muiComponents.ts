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
      },
    },
  },
  MuiIconButton: {
    styleOverrides: { root: { borderRadius: "var(--shape-borderRadius)" } },
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
    defaultProps: { disableGutters: true },
    styleOverrides: {
      root: {
        borderRadius: "var(--shape-borderRadius)",
        fontFamily: "var(--font-h)",
        gap: "0.5rem",
        paddingInline: "0.5rem",
      },
    },
  },
  MuiPaper: { defaultProps: { elevation: 0 } },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        transition: "font-size 0.3s var(--transition-tf)",
      },
    },
  },
  MuiTooltip: {
    defaultProps: { arrow: true },
  },
};
export default components;
