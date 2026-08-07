import type { ComponentProps, ReactElement, ReactNode } from "react";
import type { UseRippleProps } from "../../Misc/Ripple/Ripple";

export interface CheckboxProps extends Omit<
  ComponentProps<"input">,
  "onChange" | "type" | "size"
> {
  /**
   * Class for the root of the Checkbox component to modify class of the input element use slotProps.input
   */
  className?: string;
  /**
   * Label for the checkbox containing helpful info
   */
  label?: string;
  /**
   * Text containing error info about the input if the input is errored
   */
  error?: string;
  /**
   * Handle the indeterminate state
   */
  indeterminate?: boolean;
  /**
   * Skips registering with group even if wrapped with `<CheckboxProvider/>`
   */
  skipGroup?: boolean;
  /**
   * Extends inputs onChange handler to also include checked along with event
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  /**
   * Use if you want to pass your own checked state icon
   */
  checkedIcon?: ReactElement<ComponentProps<"svg">>;
  /**
   * Use if you want to pass your own indeterminate state icon
   */
  indeterminateIcon?: ReactElement<ComponentProps<"svg">>;
  /**
   * Icon at the start of the Input
   */
  startIcon?: ReactNode;
  /**
   * Icon at the end of the Input
   */
  endIcon?: ReactNode;
  slotProps?: {
    /**
     * If the root wrapping `<div/>` needs some props to be passes
     * for className use the className prop of the `<Checkbox/>` component instead
     */
    root?: Omit<ComponentProps<"div">, "className">;
    /**
     * Contains `[{startIcon} {checkbox} {label} {endIcon}]`
     */
    inputWrapper?: ComponentProps<"span">;
    /**
     * Contains the startIcon in a `<span/>`
     */
    startIcon?: ComponentProps<"span">;
    /**
     * A `<span/>` acting as the visual checkbox
     */
    checkbox?: ComponentProps<"span">;
    /**
     * Props for the Ripple component
     */
    ripple?: UseRippleProps;
    /**
     * Contains the endIcon in a `<span/>`
     */
    endIcon?: ComponentProps<"span">;
    /**
     * Contains the label text in a `<label/>`
     */
    label?: ComponentProps<"label">;
    /**
     * Contains a `<p/>` tag with the error text
     */
    error?: ComponentProps<"p">;
    /**
     * If for some reason the className of the input needs to be modified
     */
    input?: Pick<ComponentProps<"input">, "className">;
    /**
     * Contains the checkbox icons for checked and indeterminate states
     */
    checkboxIconsWrapper?: ComponentProps<"span">;
  };
  /**
   * Size of the checkbox and its label
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Color of the checkbox and its label
   */
  color?: "primary" | "secondary" | "tertiary" | "error" | "warn" | "success";
  /**
   * size attribute of the html `<input size=""/>` element
   */
  htmlSize?: ComponentProps<"input">["size"];
}
export type CheckboxCurrentState =
  "checked" | "unchecked" | "indeterminate" | undefined;
