"use client";

import { useId, useRef, useState, type ReactElement } from "react";
import { cn, mergeRefs } from "@cubicsui/utils";
import { eventWithRipple, useRipple } from "../../Misc/Ripple/Ripple";
import { InputHelperText } from "../../Typography/InputHelperText/InputHelperText";
import { PasswordVisibilityToggle } from "./PasswordVisibilityToggle/PasswordVisibilityToggle";
import { PasswordStrengthMeter } from "../../Display/PasswordStrengthMeter/PasswordStrengthMeter";
import type { PasswordInputProps } from "./PasswordInput.types";
import iFStyles from "../../Bases/styles/InputField.module.css";
import styles from "./PasswordInput.module.css";

export function PasswordInput(props: PasswordInputProps): ReactElement {
  const {
    className,
    label,
    id: _id,
    helperText,
    error,
    disabled,
    onTouchStart,
    onClick,
    size = "md",
    startIcon,
    endIcon,
    disableVisibilityToggle,
    enableStrengthMeter = false,
    disablePadding,
    disableInputWidth,
    htmlSize,
    fullWidth,
    required,
    slotProps = {},
    ...inputProps
  } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { rippleElements, createRipple } = useRipple(
    slotProps.ripple,
    wrapperRef,
  );
  const [showPass, setShowPass] = useState(false);
  const fallbackId = useId();
  const id = _id ?? fallbackId;
  const inputComponent = (
    <input
      {...inputProps}
      type={showPass ? "text" : "password"}
      id={id}
      className={cn(slotProps.input?.className, iFStyles.input, styles.input)}
      onTouchStart={eventWithRipple(createRipple, onTouchStart)}
      onClick={eventWithRipple(createRipple, onClick)}
      aria-invalid={!!error}
      size={htmlSize}
      required={required}
      disabled={disabled}
    />
  );

  return (
    <div
      {...slotProps.root}
      className={cn(
        className,
        iFStyles.root,
        fullWidth ? iFStyles.fullWidth : "",
        disablePadding
          ? cn(iFStyles.disablePadding, styles.disablePadding)
          : "",
        disableInputWidth ? iFStyles.disableInputWidth : "",
      )}
      data-size={size}
      data-error={!!error}
      data-disabled={disabled}
    >
      {label && (
        <label
          {...slotProps.label}
          htmlFor={id}
          className={cn(slotProps.label?.className, iFStyles.label)}
          data-required={required}
        >
          {label}
        </label>
      )}
      <div
        {...slotProps.inputWrapper}
        ref={mergeRefs(slotProps.inputWrapper?.ref, wrapperRef)}
        className={cn(slotProps.inputWrapper?.className, iFStyles.inputWrapper)}
      >
        {startIcon && (
          <span
            {...slotProps.startIcon}
            className={cn(
              iFStyles.iconContainer,
              styles.iconContainer,
              slotProps.startIcon?.className,
            )}
          >
            {startIcon}
          </span>
        )}
        {disableVisibilityToggle ? (
          inputComponent
        ) : (
          <span className={cn(styles.visibilityToggleWrapper)}>
            {inputComponent}
            <PasswordVisibilityToggle
              {...slotProps.visibilityToggle}
              showPass={showPass}
              inputId={id}
              onClick={() => setShowPass(!showPass)}
            />
          </span>
        )}
        {endIcon && (
          <span
            {...slotProps.endIcon}
            className={cn(
              iFStyles.iconContainer,
              styles.iconContainer,
              slotProps.endIcon?.className,
            )}
          >
            {endIcon}
          </span>
        )}
        {rippleElements}
      </div>
      {enableStrengthMeter && (
        <PasswordStrengthMeter {...slotProps.strengthMeter} />
      )}
      <InputHelperText
        {...slotProps.helperText}
        className={cn(slotProps.helperText?.className, iFStyles.helperText)}
        text={error ?? helperText}
      />
    </div>
  );
}
/**
 * ```
 *  root
 *   |label
 *   |inputWrapper
 *   |   |startIcon
 *   |   |input
 *   |   |visibilityToggle
 *   |   |endIcon
 *   |   |ripple
 *   |strengthMeter
 *   |helperText
 * ```
 */
