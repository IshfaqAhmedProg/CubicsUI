"use client";

import { useId, useRef, type ReactElement } from "react";
import { cn, mergeRefs } from "@cubicsui/utils";
import { eventWithRipple, useRipple } from "../../Misc/Ripple/Ripple";
import { InputHelperText } from "../../Typography/InputHelperText/InputHelperText";
import type { TextAreaInputProps } from "./TextAreaInput.types";
import textInputStyles from "../TextInput/TextInput.module.css";
import styles from "./TextAreaInput.module.css";

export function TextAreaInput(props: TextAreaInputProps): ReactElement {
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
    disablePadding,
    disableInputWidth,
    disableResize,
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
        textInputStyles.root,
        fullWidth ? textInputStyles.fullWidth : "",
        disablePadding ? textInputStyles.disablePadding : "",
        disableInputWidth ? textInputStyles.disableInputWidth : "",
        disableResize ? styles.disableResize : "",
      )}
      data-size={size}
      data-error={!!error}
      data-disabled={disabled}
    >
      {label && (
        <label
          {...slotProps.label}
          htmlFor={id}
          className={cn(slotProps.label?.className, textInputStyles.label)}
        >
          {required && "*"}
          {label}
        </label>
      )}
      <div
        {...slotProps.inputWrapper}
        ref={mergeRefs(slotProps.inputWrapper?.ref, wrapperRef)}
        className={cn(
          slotProps.inputWrapper?.className,
          textInputStyles.inputWrapper,
        )}
      >
        {startIcon && (
          <span
            {...slotProps.startIcon}
            className={cn(
              textInputStyles.iconContainer,
              slotProps.startIcon?.className,
            )}
          >
            {startIcon}
          </span>
        )}
        <textarea
          id={id}
          className={cn(
            slotProps.input?.className,
            textInputStyles.input,
            styles.input,
          )}
          onTouchStart={eventWithRipple(createRipple, onTouchStart)}
          onClick={eventWithRipple(createRipple, onClick)}
          aria-invalid={!!error}
          required={required}
          disabled={disabled}

          {...inputProps}
        />
        {endIcon && (
          <span
            {...slotProps.endIcon}
            className={cn(
              textInputStyles.iconContainer,
              slotProps.endIcon?.className,
            )}
          >
            {endIcon}
          </span>
        )}
        {rippleElements}
      </div>
      <InputHelperText
        {...slotProps.helperText}
        className={cn(
          slotProps.helperText?.className,
          textInputStyles.helperText,
        )}
        text={error ?? helperText}
      />
    </div>
  );
}
