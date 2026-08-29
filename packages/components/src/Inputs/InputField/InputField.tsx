"use client";

import { useRef, type ReactElement } from "react";
import { useRipple } from "../../Misc/Ripple/Ripple";
import { TextOrList } from "../../Typography/TextOrList/TextOrList";
import { cn, mergeRefs } from "@cubicsui/utils";
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
    disableRipple,
    slotProps = {},

    inputId,
    descriptionId,
    rootClass,
    children,
  } = props;
  const surfaceRef = useRef<HTMLDivElement>(null);
  const { createRipple, rippleElements } = useRipple(
    {
      ...slotProps.ripple,
      disabled: slotProps.ripple?.disabled ?? disableRipple,
    },
    surfaceRef,
  );

  return (
    <div
      {...slotProps.root}
      className={cn(
        rootClass,
        "InputField_root",
        fullWidth && "fullWidth",
        disablePadding && "disablePadding",
      )}
      data-size={size}
      data-error={!!error}
    >
      {label && (
        <label
          {...slotProps.label}
          className={cn(slotProps.label?.className, "InputField_label")}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      {beforeSurface}
      <div
        {...slotProps.inputSurface}
        ref={mergeRefs(slotProps.inputSurface?.ref, surfaceRef)}
        className={cn(
          slotProps.inputSurface?.className,
          "InputField_inputSurface",
        )}
        data-start-adornment={!!startAdornment || undefined}
        data-end-adornment={!!endAdornment || undefined}
      >
        {startAdornment && (
          <span
            {...slotProps.startAdornment}
            className={cn(
              slotProps.startAdornment?.className,
              "InputField_adornment",
            )}
          >
            {startAdornment}
          </span>
        )}
        {children?.({ createRipple })}
        {endAdornment && (
          <span
            {...slotProps.endAdornment}
            className={cn(
              slotProps.endAdornment?.className,
              "InputField_adornment",
            )}
          >
            {endAdornment}
          </span>
        )}
        {rippleElements}
      </div>
      {afterSurface}
      <TextOrList
        {...slotProps.helperText}
        id={(slotProps.helperText?.id, descriptionId)}
        className={cn(slotProps.helperText?.className, "InputField_helperText")}
        text={error ?? helperText}
      />
    </div>
  );
}
