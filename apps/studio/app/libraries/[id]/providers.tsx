"use client";

import { Library } from "@/library/types/Library";
import { createContext, ReactNode, useContext } from "react";

export interface LibraryContextProps {
  library: Library;
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
}: LibraryProviderProps) {
  return (
    <LibraryContext.Provider value={{ library }}>
      {children}
    </LibraryContext.Provider>
  );
}
