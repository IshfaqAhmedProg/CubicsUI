"use client";

import { useEffect, useRef, useState } from "react";

export function useMounted(): { mounted: boolean } {
  const [mounted, setMounted] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    setMounted(mountedRef.current);
  }, []);

  return { mounted };
}
