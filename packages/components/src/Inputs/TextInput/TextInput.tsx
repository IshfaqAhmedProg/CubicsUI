"use client";

import {
  useId,
  useRef,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn, mergeRefs } from "@cubicsui/utils";
import { eventWithRipple, useRipple } from "../../Misc/Ripple/Ripple";
import { InputHelperText } from "../../Typography/InputHelperText/InputHelperText";
import type { TextInputProps } from "./TextInput.types";
import styles from "./TextInput.module.css";

export function TextInput(props: TextInputProps): ReactElement {
  const {
    className,
    label,
    id: _id,
    error,
    helperText,
    disabled,
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
        styles.root,
        fullWidth ? styles.fullWidth : "",
        disablePadding ? styles.disablePadding : "",
        disableInputWidth ? styles.disableInputWidth : "",
      )}
      data-size={size}
      data-error={!!error}
      data-disabled={disabled}
    >
      {label && (
        <TextInputLabel {...slotProps.label} inputId={id} required={required}>
          {label}
        </TextInputLabel>
      )}
      <TextInputInputWrapper
        {...slotProps.inputWrapper}
        rippleElements={rippleElements}
        ref={mergeRefs(slotProps.inputWrapper?.ref, wrapperRef)}
      >
        {startIcon && (
          <TextInputIconContainer {...slotProps.startIcon}>
            {startIcon}
          </TextInputIconContainer>
        )}
        <input
          type={type}
          id={id}
          className={cn(slotProps.input?.className, styles.input)}
          onTouchStart={eventWithRipple(createRipple, onTouchStart)}
          onClick={eventWithRipple(createRipple, onClick)}
          aria-invalid={!!error}
          size={htmlSize}
          required={required}
          disabled={disabled}
          {...inputProps}
        />
        {endIcon && (
          <TextInputIconContainer {...slotProps.endIcon}>
            {endIcon}
          </TextInputIconContainer>
        )}
        {rippleElements}
      </TextInputInputWrapper>
      <InputHelperText
        {...slotProps.helperText}
        className={cn(slotProps.helperText?.className, styles.helperText)}
        text={error ?? helperText}
      />
    </div>
  );
}
export function TextInputLabel(
  props: ComponentProps<"label"> & { inputId: string; required?: boolean },
): ReactElement {
  const { children, className, inputId, required, ...rest } = props;
  return (
    <label {...rest} htmlFor={inputId} className={cn(className, styles.label)}>
      {required && "*"}
      {children}
    </label>
  );
}
export function TextInputIconContainer(
  props: ComponentProps<"span"> & { icon?: ReactNode },
): ReactElement {
  const { children, className, ...rest } = props;
  return (
    <span {...rest} className={cn(className, styles.iconContainer)}>
      {children}
    </span>
  );
}
export function TextInputInputWrapper(
  props: ComponentProps<"div"> & { rippleElements?: ReactNode },
): ReactElement {
  const { className, children, rippleElements, ...rest } = props;

  return (
    <div {...rest} className={cn(className, styles.inputWrapper)}>
      {children}
      {rippleElements}
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
