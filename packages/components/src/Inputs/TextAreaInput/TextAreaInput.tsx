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
    slotProps = {},

    id,
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
    slotProps,

    inputId,
    descriptionId,
    rootClasses: cn(disableResize && "TextAreaInput_disableResize"),
  };
  return (
    <InputField {...inputFieldProps}>
      {({ createRipple }) => {
        return (
          <textarea
            id={inputId}
            className={cn("InputField_input", "TextAreaInput_input")}
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
