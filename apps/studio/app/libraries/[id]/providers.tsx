"use client";

import { Library, LibraryWithConfigurations } from "@/library/types/Library";
import { configurations } from "@cubicsui/db";
import { createContext, ReactNode, useContext, useState } from "react";

export interface LibraryContextProps {
  library: Library;
  configurations: configurations[];
}
export interface LibraryProviderProps extends LibraryContextProps {
  children: ReactNode;
}
const LibraryContext = createContext<LibraryContextProps | null>(null);

export function useLibrary() {
  const c = useContext(LibraryContext);
  if (!c) throw new Error("Components must be wrapped in <LibraryProvider/>");
  return c;
}

export default function LibraryProvider({
  children,
  library,
  configurations,
}: LibraryProviderProps) {
  return (
    <LibraryContext.Provider value={{ library, configurations }}>
      {children}
    </LibraryContext.Provider>
  );
}
