import type { ComponentProps } from "react";
import type { PasswordStrengthMeterProps } from "./PasswordStrengthMeter/PasswordStrengthMeter.types";

export interface PasswordInputProps extends Omit<
  ComponentProps<"input">,
  "size"
> {
  /** size attribute of the html `<input size=""/>` element */
  htmlSize?: ComponentProps<"input">["size"];

  /** Removes the toggle button for showing or hiding the password */
  disableVisibilityToggle?: boolean;

  /** Enables password strength meter below the password input, pass down the score using slotProps.score */
  enableStrengthMeter?: boolean;

  /**
   * The slot props for the `<PasswordInput/>`
   * ```
   *  root
   *   |label
   *   |inputSurface
   *   |   |startIcon
   *   |   |inputWrapper
   *   |   |   |input
   *   |   |   |visibilityToggle
   *   |   |endIcon
   *   |   |ripple
   *   |strengthMeter
   *   |helperText
   * ```
   * @link PasswordInputSlotProps
   */
  slotProps?: PasswordInputSlotProps;
}

export interface PasswordInputSlotProps {
  /** If for some reason the className of the input needs to be modified, rest of the props can be passed to the `<Checkbox/>` component */
  input?: Pick<ComponentProps<"input">, "className">;

  /** Button containing the visibility toggle of the password */
  visibilityToggle?: PasswordVisibilityToggleProps;

  /** Props for the PasswordStrengthMeter if enabled */
  strengthMeter?: PasswordStrengthMeterProps;
}
export interface PasswordVisibilityToggleProps extends ComponentProps<"button"> {
  showPass: boolean;
  inputId: string;
}
