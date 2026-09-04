"use client";

import { ThemeToggle } from "@cubicsui/components";
import styles from "./Header.module.css";
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
