"use client";

import { useId, type ReactElement } from "react";
import { cn } from "@cubicsui/utils";
import { eventWithRipple } from "../../Misc/Ripple/Ripple";
import { InputField } from "../InputField/InputField";
import type { SelectProps } from "./Select.types";
import "./Select.styles.css";
import type { InputFieldProps } from "../InputField/InputField.types";

/**
 * Interchangeable with the native `<select/>` element for more control like combobox, multiselect, autocomplete, async or creatable support use <Combobox/> component.
 * You cannot use any element inside a native `<option/>` element currently in browsers like firefox and safari, only text.
 */
export function Select(props: SelectProps): ReactElement {
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
    disableRipple,
    rootClasses,
    slotProps = {},

    id,
    className,
    htmlSize,
    multiple,
    onTouchStart,
    onClick,
    children,
    ...selectProps
  } = props;
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
    afterSurface,
    startAdornment,
    endAdornment,
    fullWidth,
    disablePadding,
    disableRipple: multiple ?? disableRipple,
    rootClasses,
    slotProps,

    inputId,
    descriptionId,
  };
  return (
    <InputField {...inputFieldProps}>
      {({ createRipple }) => (
        <select
          id={id}
          className={cn(className, "InputField_input", "Select_input")}
          onTouchStart={eventWithRipple(createRipple, onTouchStart)}
          onClick={eventWithRipple(createRipple, onClick)}
          aria-invalid={!!error}
          size={htmlSize}
          multiple={multiple}
          {...selectProps}
        >
          {children}
        </select>
      )}
    </InputField>
  );
}
