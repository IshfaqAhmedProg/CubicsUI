"use client";

import { usePointerPosition } from "@cubicsui/hooks";
import { cn, remap } from "@cubicsui/utils";
import type { CSSProperties, ReactElement } from "react";
import type { PointerLightProps } from "./PointerLight.types";
import styles from "./PointerLight.module.css";

function getSpeedAdjustedSize(value: number, mouseSpeed: number) {
  return value - Math.round(remap(mouseSpeed, [33, 1000], [0, 100]));
}
// TODO fix functionality
export function PointerLight(props: PointerLightProps): ReactElement {
  const {
    overlay = false,
    colorA = "color-mix(in srgb, var(--color-primary) 50%, transparent)",
    colorB = "color-mix(in srgb, var(--color-secondary) 50%, transparent)",
    slotProps = {},
    className,
    style,
    ...rest
  } = props;
  const { pointerPosition, pointerSpeed } = usePointerPosition();

  return (
    <div
      {...slotProps.root}
      className={cn(
        styles.root,
        slotProps.root?.className,
        overlay ? styles.overlay : "",
      )}
      style={
        {
          "--cursor-color-a": colorA,
          "--cursor-color-b": colorB,
        } as CSSProperties
      }
    >
      <div
        {...rest}
        className={cn(styles.main, className)}
        style={{
          left: `${pointerPosition.x}px`,
          top: `${pointerPosition.y}px`,
          width: `${getSpeedAdjustedSize(33.75, pointerSpeed)}em`,
          height: `${getSpeedAdjustedSize(24, pointerSpeed)}em`,
          ...style,
        }}
      />
    </div>
  );
}
