import type { PositionStringExclude } from "@cubicsui/types";
import type { CSSProperties } from "react";
import type { ButtonProps } from "../Button/Button";

export interface CloseButtonProps extends Omit<
  ButtonProps,
  "children" | "position"
> {
  /** spacing around the button */
  margin?: CSSProperties["margin"];
  /** Where the `<CloseButton/>` should be positioned */
  position?: PositionStringExclude<
    "center center" | "center left" | "center right"
  >;
}
