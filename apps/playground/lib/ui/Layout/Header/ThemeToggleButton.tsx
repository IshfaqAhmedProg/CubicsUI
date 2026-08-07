import { Button, type ButtonProps } from "@cubicsui/components";
import type { ThemeObject } from "@cubicsui/types";
import type { ReactElement } from "react";

export type ThemeToggleButtonProps = Omit<
  ButtonProps,
  "variant" | "children"
> & {
  buttonVariant?: ButtonProps["variant"];
  themeObject: Partial<ThemeObject>;
  currentTheme: keyof ThemeObject;
  variant?: "full" | "text" | "icon";
};

export function ThemeToggleButton(props: ThemeToggleButtonProps): ReactElement {
  const {
    buttonVariant,
    variant = "full",
    themeObject = {},
    onClick,
    currentTheme,
    ...rest
  } = props;
  const sanitisedThemeObject: ThemeObject = {
    dark: { text: "Dark Mode", icon: <>🌚</>, ...themeObject.dark },
    light: { text: "Light Mode", icon: <>🌞</>, ...themeObject.light },
    system: { text: "System Color", icon: <>💻</>, ...themeObject.system },
  };
  const current = sanitisedThemeObject[currentTheme];

  switch (variant) {
    case "text":
      return (
        <Button
          variant={buttonVariant}
          onClick={(e) => {
            onClick?.(e);
            current.onClick?.(e);
          }}
          {...rest}
        >
          {current.text}
        </Button>
      );
    case "icon":
      return (
        <Button
          variant={buttonVariant}
          square
          onClick={(e) => {
            onClick?.(e);
            current.onClick?.(e);
          }}
          {...rest}
        >
          {current.icon}
        </Button>
      );
    default:
      return (
        <Button
          startIcon={current.icon}
          variant={buttonVariant}
          onClick={(e) => {
            onClick?.(e);
            current.onClick?.(e);
          }}
          {...rest}
        >
          {current.text}
        </Button>
      );
  }
}
