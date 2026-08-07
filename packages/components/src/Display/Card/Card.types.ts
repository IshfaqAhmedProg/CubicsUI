/**
 * Props specific to the Card component.
 *
 * These extend the intrinsic element props of whatever element is passed via `as`.
 */
export interface CardBaseProps {
  /** Visual style variant.
   * @default "contained"
   */
  variant?: "contained" | "outlined";

  /** Expands width to 100%. */
  fullWidth?: boolean;

  /** Expands height to 100%. */
  fullHeight?: boolean;

  /** Expands card to fill screen */
  fullScreen?: boolean;

  /** Force a 1:1 aspect ratio. */
  square?: boolean;

  /** These define the amount of padding around the card
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /** Use this if no padding should be set around the card */
  disablePadding?: boolean;
}
