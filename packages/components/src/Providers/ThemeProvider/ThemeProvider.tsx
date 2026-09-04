"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactElement,
  type Context,
  type ComponentProps,
} from "react";
import type {
  ThemeContextProps,
  ThemeProviderProps,
  ResolvedTheme,
  Theme,
} from "./ThemeProvider.types";
import { ThemeScript } from "./ThemeScript";
import { notImplemented } from "@cubicsui/utils";

const IS_SERVER = typeof window === "undefined";
const MEDIA = "(prefers-color-scheme: dark)";
export const THEME_PROVIDER_DEFAULTS = {
  attribute: "data-theme",
  storageKey: "themePreference",
  defaultTheme: "light",
  enableSystem: false,
  enableColorScheme: false,
};

export const ThemeContext: Context<ThemeContextProps | null> =
  createContext<ThemeContextProps | null>(null);

export function useTheme(): ThemeContextProps {
  const c = useContext(ThemeContext);
  if (!c)
    return {
      theme: "light",
      setTheme: notImplemented,
      resolvedTheme: "light",
    };
  return c;
}

function getInitialTheme(
  storageKey: string,
  defaultTheme: Theme,
  enableSystem: boolean,
): Theme {
  if (IS_SERVER) return defaultTheme;

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) return stored as Theme;
  } catch (e) {
    // Unsupported
  }

  return enableSystem
    ? window.matchMedia(MEDIA).matches
      ? "dark"
      : "light"
    : defaultTheme;
}

function resolveTheme(theme: Theme, enableSystem: boolean): ResolvedTheme {
  if (theme === "system" && enableSystem) {
    return !IS_SERVER && window.matchMedia(MEDIA).matches ? "dark" : "light";
  }
  return theme as ResolvedTheme;
}

export function ThemeProvider(props: ThemeProviderProps): ReactElement {
  const {
    children,
    attribute = "data-theme",
    storageKey = "themePreference",
    defaultTheme = "light",
    enableSystem = true,
    enableColorScheme = false,
    disableTransitionOnChange = false,
    nonce,
    scriptProps,
  } = props;
  const initialTheme = getInitialTheme(storageKey, defaultTheme, enableSystem);
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  // The resolved value applied to the DOM.
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
    resolveTheme(initialTheme, enableSystem),
  );

  const applyTheme = (name: ResolvedTheme) => {
    const enable = disableTransitionOnChange
      ? disableTransition({ nonce })
      : null;
    let d = document.documentElement;

    d.setAttribute(attribute, name);
    if (enableColorScheme) d.style.colorScheme = name;
    enable?.();
  };

  function setTheme(value: Theme) {
    setThemeState(value);
    setResolvedTheme(resolveTheme(value, enableSystem));
    try {
      localStorage.setItem(storageKey, value);
    } catch (e) {
      // Unsupported
    }
  }

  // Cross-tab syncing
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) return;
      const newTheme = (e.newValue as Theme) || defaultTheme;
      setThemeState(newTheme);
      setResolvedTheme(resolveTheme(newTheme, enableSystem));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [storageKey, defaultTheme, enableSystem]);

  // During in system mode, resolvedTheme sync with live OS changes.
  useEffect(() => {
    if (!enableSystem || theme !== "system" || IS_SERVER) return;
    const mql = window.matchMedia(MEDIA);
    const handleChange = () => {
      setResolvedTheme(mql.matches ? "dark" : "light");
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [theme, enableSystem]);

  // Apply resolved theme
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme, applyTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme,
        systemEnabled: enableSystem,
      }}
    >
      <ThemeScript
        {...scriptProps}
        storageKey={storageKey}
        attribute={attribute}
        defaultTheme={defaultTheme}
        enableSystem={enableSystem}
        enableColorScheme={enableColorScheme}
        nonce={nonce}
      />
      {children}
    </ThemeContext.Provider>
  );
}
// Briefly disables all CSS transitions so elements don't animate through
// intermediate colors while the theme attribute flips.
function disableTransition(styleProps: ComponentProps<"style">) {
  const { nonce } = styleProps;
  const css = document.createElement("style");
  if (nonce) css.setAttribute("nonce", nonce);
  css.appendChild(
    document.createTextNode("*,*::before,*::after{transition:none!important}"),
  );
  document.head.appendChild(css);

  return () => {
    // Force a reflow so the "no transition" rule applies before removal.
    window.getComputedStyle(document.body);
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
}
