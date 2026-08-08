import type { CSSProperties } from "react";

export interface UseRippleProps {
  /**
   * duration of the ripple in miliseconds
   * @default 750
   */
  duration?: number;
  /**
   * color of the ripple
   * @default "currentColor"
   */
  color?: CSSProperties["color"];
  /**
   * disabled ripple effect
   * @default false
   */
  disabled?: boolean;
}

export interface Ripple {
  key: number;
  size: number;
  x: number;
  y: number;
}
export type RippleEventHandler<T = unknown> = (event: T) => void;
