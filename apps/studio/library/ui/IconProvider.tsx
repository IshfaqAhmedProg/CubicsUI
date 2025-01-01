"use client";

import { ReactNode } from "react";
import { IconContext } from "react-icons";

export default function IconProvider({ children }: { children: ReactNode }) {
  return (
    <IconContext.Provider value={{ color: "var(--text-faint)" }}>
      {children}
    </IconContext.Provider>
  );
}
