"use client";

import { useId, useRef, type ReactElement } from "react";
import type { SelectProps } from "./Select.types";
import { cn, mergeRefs } from "@cubicsui/utils";
import { eventWithRipple, useRipple } from "../../Misc/Ripple/Ripple";
import { InputHelperText } from "../../Typography/InputHelperText/InputHelperText";
import iFStyles from "../../Bases/styles/InputField.module.css";
import styles from "./Select.module.css";

/**
 * Interchangeable with the native `<select/>` element for more control like combobox, multiselect, autocomplete, async or creatable support use <Autocomplete/> component.
 * You cannot use any element inside a native `<option/>` element currently in browsers like firefox and safari, only text.
 */
export function Select(props: SelectProps): ReactElement {
  const {
    id: _id,
    className,
    children,
    size,
    label,
    error,
    required,
    helperText,
    startIcon,
    endIcon,
    fullWidth,
    disablePadding,
    disableInputWidth,
    htmlSize,
    onTouchStart,
    onClick,
    slotProps = {},
    multiple,
    ...selectProps
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
        >
          {required && "*"}
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
              slotProps.startIcon?.className,
              iFStyles.iconContainer,
            )}
          >
            {startIcon}
          </span>
        )}
        <select
          id={id}
          className={cn(
            slotProps.select?.className,
            iFStyles.input,
            styles.select,
          )}
          onTouchStart={eventWithRipple(createRipple, onTouchStart)}
          onClick={eventWithRipple(createRipple, onClick)}
          aria-invalid={!!error}
          size={htmlSize}
          required={required}
          multiple={multiple}
          {...selectProps}
        >
          {children}
        </select>
        {endIcon && (
          <span
            {...slotProps.endIcon}
            className={cn(slotProps.endIcon?.className, iFStyles.iconContainer)}
          >
            {endIcon}
          </span>
        )}
        {!multiple && rippleElements}
      </div>
      <InputHelperText
        {...slotProps.helperText}
        className={cn(slotProps.helperText?.className, iFStyles.helperText)}
        text={error ?? helperText}
      />
    </div>
  );
}
