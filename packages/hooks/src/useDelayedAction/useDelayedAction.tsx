"use client";

import { useCallback } from "react";

export function useDelayedAction(): <T extends () => unknown>(
  fn: T,
  ms: number,
) => Promise<void> {
  const delayedExecute = useCallback(
    async <T extends () => unknown>(fn: T, ms: number) => {
      await new Promise((resolve) => setTimeout(resolve, ms));
      fn();
    },
    [],
  );

  return delayedExecute;
}
