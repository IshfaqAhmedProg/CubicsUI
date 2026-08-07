import type { ComponentProps, CSSProperties, ReactNode } from "react";
import type { UseRippleProps } from "../../Misc/Ripple/Ripple";

/**
 * Props specific to the Button component.
 */
export interface ButtonBaseProps {
  /** Renders an icon at the beginning of the button. */
  startIcon?: ReactNode;

  /** Renders an icon at the end of the button. */
  endIcon?: ReactNode;

  /** Marks the button as selected. */
  selected?: boolean;

  /** Visual style variant.
   * @default "text"
   */
  variant?: "contained" | "outlined";

  /** Expands width to 100%.
   * @default false
   */
  fullWidth?: boolean;

  /** Force a 1:1 aspect ratio, good for icons
   * @default false
   */
  square?: boolean;

  /** Button size.
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /** Overrides the CSS `position` property of the root element. */
  position?: CSSProperties["position"];

  /** Adds disabled styles to the button. Added this to make `<Link/>` have disabled style in next js
   * @default false
   */
  disabled?: boolean;
  /**
   * Color theme of the button
   * @default "default"
   */
  color?: "primary" | "secondary" | "tertiary" | "error" | "warn" | "success";
  /**
   * Slot props for customizing internal elements.
   * {@link ButtonSlotProps}
   */
  slotProps?: ButtonSlotProps;
}
/**
 * The slot props for the button
 */
export interface ButtonSlotProps {
  /** Props for the ripple effect.
   * {@link UseRippleProps}
   */
  ripple?: UseRippleProps;

  /** Wrapper span for the start icon. */
  startIcon?: ComponentProps<"span">;

  /** Wrapper span for the end icon. */
  endIcon?: ComponentProps<"span">;
}
