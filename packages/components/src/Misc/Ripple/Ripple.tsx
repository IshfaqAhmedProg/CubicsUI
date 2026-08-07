"use client";

import type {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  MouseEvent,
  ReactElement,
  SyntheticEvent,
  TouchEvent,
} from "react";
import { useCallback, useState } from "react";
import styles from "./Ripple.module.css";

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

interface Ripple {
  key: number;
  size: number;
  x: number;
  y: number;
}
export type RippleEventHandler<T = unknown> = (event: T) => void;

export function eventWithRipple<
  E extends SyntheticEvent<HTMLElement> = SyntheticEvent<HTMLElement>,
>(
  createRipple: (event: E) => void,
  ...handlers: (RippleEventHandler<E> | undefined)[]
) {
  return (event: E): void => {
    createRipple?.(event);
    for (const h of handlers) h?.(event);
  };
}

export function useRipple<C extends HTMLElement>(
  props: UseRippleProps = {},
): {
  createRipple: (
    event: TouchEvent<C> | MouseEvent<C> | ChangeEvent<C> | FocusEvent<C>,
  ) => void;
  rippleElements: ReactElement[];
} {
  const { duration = 750, color = "currentColor", disabled = false } = props;

  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = useCallback(
    (
      event: TouchEvent<C> | MouseEvent<C> | ChangeEvent<C> | FocusEvent<C>,
    ): void => {
      const { currentTarget } = event;
      const isMouseEvent = "clientX" in event && "clientY" in event;
      if (!currentTarget) return;
      if (disabled) return;

      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();

      const diameter = Math.max(element.offsetWidth, element.offsetHeight);
      const radius = diameter / 2;

      const left = isMouseEvent
        ? event.clientX - rect.left - radius
        : Math.floor((rect.right - rect.left) / 2);
      const top = isMouseEvent
        ? event.clientY - rect.top - radius
        : Math.floor((rect.bottom - rect.top) / 2);

      const newRipple = {
        key: Date.now(),
        size: diameter,
        x: left,
        y: top,
        color,
      };

      setRipples((prev) => (prev.length <= 2 ? [...prev, newRipple] : prev));

      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((ripple) => ripple.key !== newRipple.key),
        );
      }, duration);
    },
    [duration, color, disabled],
  );

  const rippleElements = ripples.map((ripple) => (
    <Ripple
      ripple={ripple}
      key={ripple.key}
      duration={duration}
      color={color}
    />
  ));

  return { createRipple, rippleElements };
}
function Ripple({
  ripple,
  color,
  duration,
}: { ripple: Ripple } & UseRippleProps) {
  return (
    <span className={styles.container}>
      <span
        className={styles.ripple}
        style={{
          ...({
            "--ripple-color": color,
            "--ripple-duration": `${duration}ms`,
          } as CSSProperties),
          width: ripple.size,
          height: ripple.size,
          left: ripple.x,
          top: ripple.y,
        }}
      />
    </span>
  );
}
