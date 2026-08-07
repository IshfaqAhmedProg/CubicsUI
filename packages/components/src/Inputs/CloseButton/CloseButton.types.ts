import type { PositionStringExclude } from "@cubicsui/types";
import type { CSSProperties } from "react";
import type { ButtonProps } from "../Button/Button";

export interface CloseButtonProps extends Omit<
  ButtonProps,
  "children" | "position"
> {
  margin?: CSSProperties["margin"];
  position?: PositionStringExclude<
    "center center" | "center left" | "center right"
  >;
}
