import Grid from "@/library/ui/Layout/Grid";
import TitleCrumbs from "@/library/ui/Typography/TitleCrumbs";
import React, { ReactNode } from "react";
import styles from "./page.module.scss";

export default function layout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <Grid
      gap={"var(--sp-2)"}
      className={styles.container}
    >
      <TitleCrumbs />
      {children}
    </Grid>
  );
}
