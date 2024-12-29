import Link from "next/link";
import React from "react";
import styles from "./page.module.css";

export default function Sidebar() {
  const sidebarLinks = [
    {
      label: "Create New Component",
      href: "/dashboard/create",
    },
    {
      label: "List all components",
      href: "/dashboard/list",
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
