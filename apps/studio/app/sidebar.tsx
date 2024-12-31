import Link from "next/link";
import React from "react";
import styles from "./page.module.scss";

export default function Sidebar() {
  const sidebarLinks = [
    {
      label: "Components",
      href: "/components",
    },
  ];
  return (
    <nav className={styles.sidebar}>
      {sidebarLinks.map((sl) => {
        return (
          <Link
            key={sl.href}
            href={sl.href}
          >
            {sl.label}
          </Link>
        );
      })}
    </nav>
  );
}
