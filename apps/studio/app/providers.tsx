import { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material";
import muiTheme from "@/library/themes/muiTheme";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import NextTopLoader from "nextjs-toploader";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={muiTheme}>
        <InitColorSchemeScript attribute="class" />
        <NextTopLoader
          showSpinner={false}
          color="var(--palette-primary-main)"
        />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
