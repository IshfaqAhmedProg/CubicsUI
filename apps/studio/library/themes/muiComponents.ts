import type { Components, CssVarsTheme, Theme } from "@mui/material";

const components:
  | Components<Omit<Theme, "components" | "palette"> & CssVarsTheme>
  | undefined = {
  MuiAccordion: {
    styleOverrides: {
      root: {
        borderRadius: "var(--shape-borderRadius)",
        ":before": {
          all: "unset",
        },
        "&.Mui-expanded": {
          borderRadius: "var(--shape-borderRadius)",
          margin: "unset",
        },
      },
    },
  },
  MuiBreadcrumbs: {
    styleOverrides: {
      ol: {
        flexWrap: "nowrap",
      },
    },
  },
  MuiButton: {
    defaultProps: { size: "small", variant: "contained" },
    styleOverrides: {
      root: {
        fontSize: "1em",
        fontFamily: "var(--font-h)",
        textTransform: "none",
        fontWeight: "bolder",
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: "var(--palette-background-default)",
        boxShadow: "none",
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontFamily: "var(--font-h)",
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
  MuiTextField: {
    defaultProps: {
      size: "small",
    },
  },
  MuiTooltip: {
    defaultProps: { arrow: true },
  },
};
export default components;
