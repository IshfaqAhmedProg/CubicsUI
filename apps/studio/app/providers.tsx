import { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material";
import muiTheme from "@/library/themes/muiTheme";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={muiTheme}>
        <InitColorSchemeScript attribute="class" />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
