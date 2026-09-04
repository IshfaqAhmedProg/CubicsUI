import { memo, type MemoExoticComponent, type ReactElement } from "react";
import { script } from "./script";
import type { ThemeScriptInjectorProps } from "./ThemeProvider.types";
import { THEME_PROVIDER_DEFAULTS } from "./ThemeProvider";

/** Memoised Script to inject the theming logic */
export const ThemeScript: MemoExoticComponent<
  (props: ThemeScriptInjectorProps) => ReactElement
> = memo((props: ThemeScriptInjectorProps): ReactElement => {
  const {
    attribute,
    storageKey,
    defaultTheme,
    enableSystem,
    enableColorScheme,
    nonce,
    ...rest
  } = props;
  const scriptArgs = {
    ...THEME_PROVIDER_DEFAULTS,
    storageKey,
    defaultTheme,
    enableSystem,
    enableColorScheme,
    attribute,
  };
  return (
    <script
      {...rest}
      suppressHydrationWarning
      nonce={typeof window === "undefined" ? nonce : ""}
      dangerouslySetInnerHTML={{
        __html: `(${script.toString()})(${JSON.stringify(scriptArgs)})`,
      }}
    />
  );
});
