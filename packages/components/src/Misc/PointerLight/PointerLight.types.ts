import type { ComponentProps, CSSProperties } from "react";

export interface PointerLightProps extends ComponentProps<"div"> {
  /**
   * Use if cursor is too distracting
   */
  overlay?: boolean;
  colorA?: CSSProperties["color"];
  colorB?: CSSProperties["color"];
  slotProps?: {
    root?: ComponentProps<"div">;
  };
}
