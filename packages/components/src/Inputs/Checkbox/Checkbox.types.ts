import type { ComponentProps, ReactElement, ReactNode } from "react";
import type { UseRippleProps } from "../../Misc/Ripple/Ripple.types";
import type { TextOrListProps } from "../../Typography/TextOrList/TextOrList";

export interface CheckboxProps extends Omit<
  ComponentProps<"input">,
  "onChange" | "type" | "size"
> {
  /** Class for the root of the `<Checkbox/>` component, to modify class of the input element use `slotProps.input` */
  className?: string;

  /** Label for the input containing helpful info */
  label?: ReactNode;

  /** Text or array of text containing  info about the input */
  helperText?: TextOrListProps["text"];

  /** Text or array of text containing error info about the input if the input is errored */
  error?: TextOrListProps["text"];

  /** Handle the indeterminate state */
  indeterminate?: boolean;

  /** Skips registering with group even if wrapped with `<CheckboxProvider/>` */
  skipGroup?: boolean;

  /** Extends inputs onChange handler to also include checked along with event */
  onChange?: (event: React.ChangeEvent, checked: boolean) => void;

  /** Use if you want to pass your own checked state icon */
  checkedIcon?: ReactElement<ComponentProps<"svg">>;

  /** Use if you want to pass your own indeterminate state icon */
  indeterminateIcon?: ReactElement<ComponentProps<"svg">>;

  /**
   * Slot props for customizing internal elements.
   * @link CheckboxSlotProps
   */
  slotProps?: CheckboxSlotProps;

  /** Size of the checkbox and its label, to use the html attribute `size` use `htmlSize` */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /** Color of the checkbox and its label */
  color?: "primary" | "secondary" | "tertiary" | "error";

  /** size attribute of the html `<input size=""/>` element */
  htmlSize?: ComponentProps<"input">["size"];
}

/** The slot props for `<Checkbox/>`
 * ```
 *  root
 *   |inputWrapper
 *   |   |startIcon
 *   |   |checkbox
 *   |   |   |ripple
 *   |   |   |input
 *   |   |   |checkboxIconsWrapper
 *   |   |label
 *   |   |endIcon
 *   |error
 * ```
 */
export interface CheckboxSlotProps {
  /** If the root wrapping `<div/>` needs some props to be passed, for className use the className prop of the `<Checkbox/>` component instead */
  root?: Omit<ComponentProps<"div">, "className">;

  /** Contains `[{startIcon} {checkbox} {label} {endIcon}]` */
  inputWrapper?: ComponentProps<"span">;

  /** Contains the startIcon in a `<span/>` */
  startIcon?: ComponentProps<"span">;

  /** A `<span/>` that wraps the input checkbox */
  checkbox?: ComponentProps<"span">;

  /** Props for the useRipple component
   * @link UseRippleProps
   */
  ripple?: UseRippleProps;

  /** If for some reason the className of the input needs to be modified, rest of the props can be passed to the `<Checkbox/>` component */
  input?: Pick<ComponentProps<"input">, "className">;

  /** Contains the checkbox icons for checked and indeterminate states */
  checkboxIconsWrapper?: ComponentProps<"span">;

  /** Contains the label text in a `<label/>` */
  label?: ComponentProps<"label">;

  /** Contains the endIcon in a `<span/>` */
  endIcon?: ComponentProps<"span">;

  /**
   * Contains a `<p/>` or `<ul/>` tag with the helper text
   * @link TextOrListProps
   */
  helperText?: TextOrListProps;
}

export type CheckboxCurrentState =
  "checked" | "unchecked" | "indeterminate" | undefined;
