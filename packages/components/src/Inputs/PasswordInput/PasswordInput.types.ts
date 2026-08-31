import type { ComponentProps } from "react";
import type { PasswordStrengthMeterProps } from "./PasswordStrengthMeter/PasswordStrengthMeter.types";
import type {
  InputFieldSharedProps,
  InputFieldSlotProps,
} from "../InputField/InputField.types";

export interface PasswordInputProps
  extends
    Omit<ComponentProps<"input">, "size" | "type">,
    InputFieldSharedProps {
  /** size attribute of the html `<input size=""/>` element */
  htmlSize?: ComponentProps<"input">["size"];

  /** Removes the toggle button for showing or hiding the password */
  disableVisibilityToggle?: boolean;

  /** Enables password strength meter below the password input, pass down the score using slotProps.score */
  enableStrengthMeter?: boolean;

  /**
   * The slot props for the `<PasswordInput/>`, extends InputFieldSlotProps
   * ```
   *  `root <div/>
   *   |label <label/>
   *   |{beforeSurface}
   *   |inputSurface <div/>
   *   |   |startAdornment <span/>
   *   |   |inputWrapper <span/>
   *   |   |   |input <input/>
   *   |   |   |visibilityToggle <button/>
   *   |   |   |   |visibilityIcon <svg/>
   *   |   |endAdornment <span/>
   *   |   |{ripple}
   *   |strengthMeter <PasswordStrengthMeter/>
   *   |{afterSurface}
   *   |helperText <TextOrString/>`
   * ```
   * @link PasswordInputSlotProps
   */
  slotProps?: PasswordInputSlotProps;
}

export interface PasswordInputSlotProps extends InputFieldSlotProps {
  /** Wraps the input and visibility toggle button */
  inputWrapper?: ComponentProps<"span">;

  /** Button containing the visibility toggle of the password */
  visibilityToggle?: ComponentProps<"button">;

  /** Props for the PasswordStrengthMeter if enabled */
  strengthMeter?: PasswordStrengthMeterProps;
}
