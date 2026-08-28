"use client";

import { useId, useState, type ReactElement } from "react";
import { InputField } from "../InputField/InputField";
import { eventWithRipple } from "../../Misc/Ripple/Ripple";
import { cn } from "@cubicsui/utils";
import type { InputFieldProps } from "../InputField/InputField.types";
import type { PasswordInputProps } from "./PasswordInput.types";
import { PasswordVisibilityIcon } from "./PasswordVisibilityIcon/PasswordVisibilityIcon";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter/PasswordStrengthMeter";
import "./PasswordInput.styles.css";

export function PasswordInput(props: PasswordInputProps): ReactElement {
  const {
    label,
    error,
    helperText,
    size,
    beforeSurface,
    afterSurface,
    startAdornment,
    endAdornment,
    fullWidth,
    disablePadding,
    slotProps: _slotProps = {},

    id,
    htmlSize,
    disableVisibilityToggle,
    enableStrengthMeter,
    onTouchStart,
    onClick,
    ...inputProps
  } = props;
  const { strengthMeter, visibilityToggle, ...slotProps } = _slotProps;
  const [showPass, setShowPass] = useState(false);
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const descriptionId =
    !!error || !!helperText ? `${inputId}-description` : undefined;

  const inputFieldProps: InputFieldProps = {
    label,
    error,
    helperText,
    size,
    beforeSurface,
    afterSurface: (
      <>
        {enableStrengthMeter && <PasswordStrengthMeter {...strengthMeter} />}
        {afterSurface}
      </>
    ),
    startAdornment,
    endAdornment,
    fullWidth,
    disablePadding,
    slotProps,

    inputId,
    descriptionId,
  };
  return (
    <InputField {...inputFieldProps}>
      {({ createRipple }) => {
        return (
          <span className={"PasswordInput_inputWrapper"}>
            <input
              type={showPass ? "text" : "password"}
              id={inputId}
              className={cn("InputField_input")}
              onTouchStart={eventWithRipple(createRipple, onTouchStart)}
              onClick={eventWithRipple(createRipple, onClick)}
              aria-invalid={!!error}
              aria-describedby={descriptionId}
              size={htmlSize}
              {...inputProps}
            />
            {!disableVisibilityToggle && (
              <button
                {...visibilityToggle}
                aria-pressed={showPass}
                aria-controls={inputId}
                type="button"
                aria-label="Show password"
                onClick={() => setShowPass(!showPass)}
                className={cn(
                  "PasswordInput_visibilityToggle",
                  visibilityToggle?.className,
                )}
              >
                <PasswordVisibilityIcon closed={showPass} />
              </button>
            )}
          </span>
        );
      }}
    </InputField>
  );
}

/**
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
 */
