import type { ComponentProps, ReactNode } from "react";
import type { InputHelperTextProps } from "../../Typography/InputErrors/InputHelperText";
import type { UseRippleProps } from "../../Misc/Ripple/Ripple.types";

export interface TextInputProps extends Omit<ComponentProps<"input">, "size"> {
  /** Class for the root of the `<TextInput/>` component, to modify class of the input element use slotProps.input */
  className?: string;

  /** Label for the input containing helpful info */
  label?: string;

  /** Text or array of text containing  info about the input */
  helperText?: InputHelperTextProps["text"];

  /** Text or array of text containing error info about the input if the input is errored */
  error?: InputHelperTextProps["text"];

  /**
   * Size of the input and its label, to use the html attribute `size` use `htmlSize`
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /** size attribute of the html `<input size=""/>` element */
  htmlSize?: ComponentProps<"input">["size"];

  /** Icon at the start of the Input */
  startIcon?: ReactNode;

  /** Icon at the end of the Input */
  endIcon?: ReactNode;

  /**
   * Expands width to 100% of container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Removes padding around inputWrapper, use when using a button for start or end icon.
   */
  disablePadding?: boolean;

  /**
   * Makes css calculate width from label and helperText instead of input 
   */
  disableInputWidth?: boolean;

  /**
   * Slot props for customizing internal elements.
   * @link TextInputSlotProps
   */
  slotProps?: TextInputSlotProps;
}
/**
 * The slot props for the `<TextInput/>`
 * ```
 *  root
 *   |label
 *   |inputWrapper
 *   |   |startIcon
 *   |   |input
 *   |   |endIcon
 *   |   |ripple
 *   |helperText
 * ```
 */
export interface TextInputSlotProps {
  /** If the root wrapping `<div/>` needs some props to be passed, for className use the className prop of the `<TextInput/>` component instead */
  root?: Omit<ComponentProps<"div">, "className">;

  /** Contains the label text in a `<label/>` */
  label?: ComponentProps<"label">;

  /** Contains `[{startIcon} {input} {endIcon} {ripple}]` */
  inputWrapper?: ComponentProps<"div">;
  /**
   * Props for the useRipple component
   * @link UseRippleProps
   */
  ripple?: UseRippleProps;

  /** Contains the startIcon in a `<span/>` */
  startIcon?: ComponentProps<"span">;

  /** If for some reason the className of the input needs to be modified, rest of the props can be passed to the `<Checkbox/>` component */
  input?: Pick<ComponentProps<"input">, "className">;

  /** Contains the endIcon in a `<span/>` */
  endIcon?: ComponentProps<"span">;
  /**
   * Contains a `<p/>` or `<ul/>` tag with the helper text
   * @link InputHelperTextProps
   */
  helperText?: InputHelperTextProps;
}
