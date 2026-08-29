"use client";

import { useId, type ReactElement } from "react";
import { InputField } from "../InputField/InputField";
import { eventWithRipple } from "../../Misc/Ripple/Ripple";
import { cn } from "@cubicsui/utils";
import type { TextAreaInputProps } from "./TextAreaInput.types";
import "./TextAreaInput.styles.css";
import type { InputFieldProps } from "../InputField/InputField.types";

export function TextAreaInput(props: TextAreaInputProps): ReactElement {
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
    rootClass,
    slotProps = {},

    id,
    className,
    disableResize,
    onTouchStart,
    onClick,
    ...textareaProps
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
    disableRipple,
    rootClass: cn(rootClass, disableResize && "TextAreaInput_disableResize"),
    slotProps,

    inputId,
    descriptionId,
  };
  return (
    <InputField {...inputFieldProps}>
      {({ createRipple }) => {
        return (
          <textarea
            id={inputId}
            className={cn(className, "InputField_input", "TextAreaInput_input")}
            onTouchStart={eventWithRipple(createRipple, onTouchStart)}
            onClick={eventWithRipple(createRipple, onClick)}
            aria-invalid={!!error}
            aria-describedby={descriptionId}
            {...textareaProps}
          />
        );
      }}
    </InputField>
  );
}
