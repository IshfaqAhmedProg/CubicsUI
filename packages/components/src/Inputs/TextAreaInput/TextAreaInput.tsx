"use client";

import { cn, mergeRefs } from "@cubicsui/utils";
import { useId, useRef, type ReactElement } from "react";
import { eventWithRipple, useRipple } from "../../Misc/Ripple/Ripple";
import styles from "./TextAreaInput.module.css";
import { InputHelperText } from "../../Typography/InputHelperText/InputHelperText";
import type { TextAreaInputProps } from "./TextAreaInput.types";

export function TextAreaInput(props: TextAreaInputProps): ReactElement {
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
        styles.root,
        disablePadding ? styles.disablePadding : "",
        disableInputWidth ? styles.disableInputWidth : "",
        disableResize ? styles.disableResize : "",
        fullWidth ? styles.fullWidth : "",
      )}
      data-size={size}
      data-error={!!error}
    >
      {label && (
        <label
          {...slotProps.label}
          htmlFor={id}
          className={cn(slotProps.label?.className, styles.label)}
        >
          {required && "*"}
          {label}
        </label>
      )}
      <div
        {...slotProps.inputWrapper}
        ref={mergeRefs(slotProps.inputWrapper?.ref, wrapperRef)}
        className={cn(slotProps.inputWrapper?.className, styles.inputWrapper)}
      >
        {startIcon && (
          <span
            {...slotProps.startIcon}
            className={cn(styles.iconContainer, slotProps.startIcon?.className)}
          >
            {startIcon}
          </span>
        )}
        <textarea
          id={id}
          className={cn(slotProps.input?.className, styles.input)}
          onTouchStart={eventWithRipple(createRipple, onTouchStart)}
          onClick={eventWithRipple(createRipple, onClick)}
          aria-invalid={!!error}
          required={required}
          {...inputProps}
        />
        {endIcon && (
          <span
            {...slotProps.endIcon}
            className={cn(styles.iconContainer, slotProps.endIcon?.className)}
          >
            {endIcon}
          </span>
        )}
        {rippleElements}
      </div>
      <InputHelperText
        {...slotProps.helperText}
        className={cn(slotProps.helperText?.className, styles.helperText)}
        text={error ?? helperText}
      />
    </div>
  );
}
