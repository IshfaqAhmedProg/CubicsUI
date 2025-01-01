import Link from "next/link";
import React from "react";
import styles from "./page.module.scss";
import Flex from "@/library/ui/Layout/Flex";

export default function Sidebar() {
  const sidebarLinks = [
    {
      label: "Components",
      href: "/components",
    },
    {
      label: "Settings",
      href: "/settings",
    },
  ];
  return (
    <Flex
      as="nav"
      column
      gap="var(--sp-1)"
      className={styles.sidebar}
    >
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
    </Flex>
  );
}
