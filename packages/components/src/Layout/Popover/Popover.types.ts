import type {
  PositionString,
  PolymorphicComponentProps,
} from "@cubicsui/types";
import type { ElementType } from "react";

export interface PopoverBaseProps {
  /**
   * The area around the anchor where the popover should be positioned
   * @default "bottom center"
   */
  positionArea?: PositionString;
  /**
   * Origin of where the popover should animate out from
   * @default "top center"
   */
  transformOrigin?: PositionString;
}

export type PopoverProps<C extends ElementType = "div"> =
  PolymorphicComponentProps<C, PopoverBaseProps>;
