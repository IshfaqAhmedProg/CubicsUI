"use client";

import { useEffect, useMemo } from "react";
import { useLocalStorage } from "../useLocalStorage/useLocalStorage";

type ScreenSize = {
  width: number;
  height: number;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isXLarge: boolean;
  ltSmall: boolean;
  ltMedium: boolean;
  ltLarge: boolean;
  ltXLarge: boolean;
  gtSmall: boolean;
  gtMedium: boolean;
  gtLarge: boolean;
} | null;

// Move breakpoints OUTSIDE. Prevents Rollup/minifiers from collapsing them.
const BREAKPOINTS = Object.freeze({
  sm: 600,
  md: 900,
  lg: 1281,
  xl: 1536,
});

export function useScreenSize(): Partial<ScreenSize> {
  const [screenSize, setScreenSize] = useLocalStorage("screen", {
    width: 0,
    height: 0,
  });

  // Derived state — no effect needed, recomputes whenever screenSize changes
  const size = useMemo<Partial<ScreenSize>>(() => {
    const { width, height } = screenSize;
    return {
      width,
      height,
      isSmall: width < BREAKPOINTS.sm,
      isMedium: width >= BREAKPOINTS.sm && width < BREAKPOINTS.md,
      isLarge: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
      isXLarge: width >= BREAKPOINTS.lg,

      ltSmall: width < BREAKPOINTS.sm,
      ltMedium: width < BREAKPOINTS.md,
      ltLarge: width < BREAKPOINTS.lg,
      ltXLarge: width < BREAKPOINTS.xl,

      gtSmall: width >= BREAKPOINTS.sm,
      gtMedium: width >= BREAKPOINTS.md,
      gtLarge: width >= BREAKPOINTS.lg,
    };
  }, [screenSize]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const compute = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({ width, height });
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [setScreenSize]); // fixed missing dep warning

  return size;
}
