import type { MouseEvent, ReactNode } from "react";

/**
 * Use to create your own theme ui elements
 */
export type ThemeObject = Record<
  "dark" | "light" | "system",
  {
    text?: string;
    icon?: ReactNode;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
  }
>;
