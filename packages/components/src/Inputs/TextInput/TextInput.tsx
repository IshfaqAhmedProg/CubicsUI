"use client";

import { useId, type ComponentProps, type ReactElement } from "react";
import { InputField } from "../InputField/InputField";
import { eventWithRipple } from "../../Misc/Ripple/Ripple";
import { cn } from "@cubicsui/utils";
import type { InputFieldSharedProps } from "../InputField/InputField.types";

export interface TextInputProps
  extends Omit<ComponentProps<"input">, "size">, InputFieldSharedProps {
  htmlSize?: ComponentProps<"input">["size"];
}

export function TextInput(props: TextInputProps): ReactElement {
  const {
    id,
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
    disableInputWidth,

    htmlSize,
    onTouchStart,
    onClick,
    ...inputProps
  } = props;
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const inputFieldProps = {
    inputId,
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
    disableInputWidth,
  };
  return (
    <InputField {...inputFieldProps}>
      {({ createRipple }) => {
        return (
          <input
            id={inputId}
            className={cn("InputField_input", "TextInput_input")}
            onTouchStart={eventWithRipple(createRipple, onTouchStart)}
            onClick={eventWithRipple(createRipple, onClick)}
            {...inputProps}
          />
        );
      }}
    </InputField>
  );
}
