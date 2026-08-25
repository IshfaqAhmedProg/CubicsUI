"use client";

import { useId, useRef, type ReactElement } from "react";
import { cn, mergeRefs } from "@cubicsui/utils";
import { eventWithRipple, useRipple } from "../../Misc/Ripple/Ripple";
import { InputHelperText } from "../../Typography/InputHelperText/InputHelperText";
import type { TextInputProps } from "./TextInput.types";
import iFStyles from "../../Bases/styles/InputField.module.css";
import styles from "./TextInput.module.css";

export function TextInput(props: TextInputProps): ReactElement {
  const {
    className,
    label,
    id: _id,
    error,
    helperText,
    onTouchStart,
    onClick,
    size = "md",
    startIcon,
    endIcon,
    disablePadding,
    disableInputWidth,
    htmlSize,
    type = "text",
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
  const fallbackId = useId();
  const id = _id ?? fallbackId;
  return (
    <div
      {...slotProps.root}
      className={cn(
        className,
        iFStyles.root,
        fullWidth ? iFStyles.fullWidth : "",
        disablePadding ? iFStyles.disablePadding : "",
        disableInputWidth ? iFStyles.disableInputWidth : "",
      )}
      data-size={size}
      data-error={!!error}
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
              slotProps.startIcon?.className,
            )}
          >
            {startIcon}
          </span>
        )}
        <input
          type={type}
          id={id}
          className={cn(
            slotProps.input?.className,
            iFStyles.input,
            styles.input,
          )}
          onTouchStart={eventWithRipple(createRipple, onTouchStart)}
          onClick={eventWithRipple(createRipple, onClick)}
          aria-invalid={!!error}
          size={htmlSize}
          required={required}
          {...inputProps}
        />
        {endIcon && (
          <span
            {...slotProps.endIcon}
            className={cn(iFStyles.iconContainer, slotProps.endIcon?.className)}
          >
            {endIcon}
          </span>
        )}
        {rippleElements}
      </div>
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
 * root
 * |label
 * |inputWrapper
 * |  |startIcon
 * |  |input
 * |  |endIcon
 * |  |ripple
 * |error
 */
