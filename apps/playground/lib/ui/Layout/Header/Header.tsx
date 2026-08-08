"use client";

import { type ButtonProps } from "@cubicsui/components";
import styles from "./Header.module.css";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { useTheme } from "next-themes";
import { useMounted } from "@cubicsui/hooks";
import type { ThemeObject } from "@cubicsui/types";
import Link from "next/link";

export function Header() {
  return (
    <nav className={styles.root}>
      <Link href="/">
        <span className={styles.logo}>Playground</span>
      </Link>
      <ThemeToggle />
    </nav>
  );
}
function ThemeToggle(props: ButtonProps) {
  const { theme, setTheme } = useTheme();
  const { mounted } = useMounted();

  if (!mounted) return;
  return (
    <ThemeToggleButton
      {...props}
      variant="icon"
      currentTheme={theme as keyof ThemeObject}
      themeObject={{
        dark: {
          onClick: () => {
            setTheme("light");
          },
        },
        light: {
          onClick: () => {
            setTheme("dark");
          },
        },
      }}
    />
  );
}
