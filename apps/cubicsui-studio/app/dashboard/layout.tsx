import React, { ReactNode } from "react";
import styles from "./page.module.css";
import Sidebar from "./sidebar";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
