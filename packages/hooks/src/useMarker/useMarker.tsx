"use client";

import { useEffect, useRef, type RefObject } from "react";

type MarkerUpdater = (
  marker: HTMLDivElement,
  rootRect: DOMRect,
  scrollLeft: number,
  scrollTop: number,
) => void;

export type UseMarkerReturnType = {
  markerRef: RefObject<HTMLElement | null>;
  rootRef: RefObject<HTMLElement | null>;
};

export function useMarker(
  updater: MarkerUpdater,
  deps: unknown[],
): UseMarkerReturnType {
  const markerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLOListElement>(null);
  const updaterRef = useRef<MarkerUpdater>(updater);

  updaterRef.current = updater;

  useEffect(() => {
    if (!rootRef.current || !markerRef.current) return;

    const updateMarkerPosition = () => {
      if (!rootRef.current || !markerRef.current) return;

      const rootRect = rootRef.current.getBoundingClientRect();

      // Account for scroll offset
      const scrollLeft = rootRef.current.scrollLeft;
      const scrollTop = rootRef.current.scrollTop;

      updaterRef.current(markerRef.current, rootRect, scrollLeft, scrollTop);
    };

    updateMarkerPosition();

    // Update marker position when container resizes
    const resizeObserver = new ResizeObserver(updateMarkerPosition);
    resizeObserver.observe(rootRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, deps);

  return { markerRef, rootRef };
}
