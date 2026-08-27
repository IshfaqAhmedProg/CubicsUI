"use client";

import { useRef, type ReactElement } from "react";
import { useRipple } from "../../Misc/Ripple/Ripple";
import { TextOrList } from "../../Typography/TextOrList/TextOrList";
import { cn } from "@cubicsui/utils";
import "./InputField.style.css";
import type { InputFieldProps } from "./InputField.types";

export function InputField(props: InputFieldProps): ReactElement {
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
    disableInputWidth,

    inputId,
    children,
  } = props;
  const surfaceRef = useRef<HTMLDivElement>(null);
  const { createRipple, rippleElements } = useRipple({}, surfaceRef);
  return (
    <div
      className={cn(
        "InputField_root",
        fullWidth && "InputField_fullWidth",
        disablePadding && "InputField_disablePadding",
        disableInputWidth && "InputField_disableInputWidth",
      )}
      data-size={size}
    >
      {label && (
        <label className={"InputField_label"} htmlFor={inputId}>
          {label}
        </label>
      )}
      {beforeSurface}
      <div ref={surfaceRef} className={"InputField_inputSurface"}>
        {startAdornment && (
          <span className={"InputField_adornment"}>{startAdornment}</span>
        )}
        {children({ createRipple })}
        {endAdornment && (
          <span className={"InputField_adornment"}>{endAdornment}</span>
        )}
        {rippleElements}
      </div>
      {afterSurface}
      <TextOrList
        className={"InputField_helperText"}
        text={error ?? helperText}
      />
    </div>
  );
}
