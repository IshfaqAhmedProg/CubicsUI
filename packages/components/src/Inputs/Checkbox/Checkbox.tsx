"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ReactElement,
} from "react";
import { eventWithRipple, useRipple } from "../../Misc/Ripple/Ripple";
import { cn, mergeRefs } from "@cubicsui/utils";
import styles from "./Checkbox.module.css";
import type { CheckboxCurrentState, CheckboxProps } from "./Checkbox.types";
import { useCheckbox } from "./CheckboxProvider";
import { CheckIconAnimated, DashIconAnimated } from "@cubicsui/icons";
import { InputHelperText } from "../../Typography/InputErrors/InputHelperText";

export function Checkbox(props: CheckboxProps): ReactElement {
  const {
    ref,
    className,
    label,
    id: _id,
    name,
    checked,
    indeterminate = false,
    defaultChecked,
    value,
    skipGroup,
    onChange,
    onTouchStart,
    onClick,
    htmlSize,
    size = "md",
    color,
    disabled,
    error,
    helperText,
    "aria-label": ariaLabel,
    checkedIcon = <CheckIconAnimated />,
    indeterminateIcon = <DashIconAnimated />,
    startIcon,
    endIcon,
    slotProps = {},
    ...rest
  } = props;

  const isRegistered = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { rippleElements, createRipple } = useRipple(slotProps.ripple);
  const [currentState, setCurrentState] = useState<CheckboxCurrentState>(
    defaultChecked || checked
      ? "checked"
      : indeterminate
        ? "indeterminate"
        : "unchecked",
  );
  const fallbackId = useId();
  const group = useCheckbox();
  const isChecked = currentState == "checked";
  const isIndeterminate = currentState == "indeterminate";
  const id = _id ?? fallbackId;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.checked;
    setCurrentState(next ? "checked" : "unchecked");
    if (group && !skipGroup && name) group.update(name, next);
    onChange?.(e, next);
  }

  // Keep state synced when mounting because for some reason browser remembers the
  // checked state of checkboxes when refreshed, this i saw only in mozilla
  useEffect(() => {
    if (!inputRef.current) return;
    const c = inputRef.current.checked;
    setCurrentState(
      indeterminate ? "indeterminate" : c ? "checked" : "unchecked",
    );
    // Register with group if inside <CheckboxProvider/>
    if (group && !skipGroup && !isRegistered.current && name) {
      isRegistered.current = true;
      group.register(name, c);
    }
  }, [group, skipGroup, name, indeterminate]);

  // Set indeterminate state
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.indeterminate = indeterminate;
    if (indeterminate) setCurrentState("indeterminate");
  }, [indeterminate]);

  // Sync to group state if group is present and checkbox is checked in group
  useEffect(() => {
    if (!isRegistered.current || !inputRef.current || !name) return;
    inputRef.current.checked = group.values[name];
    setCurrentState(group.values[name] ? "checked" : "unchecked");
  }, [group.values, name]);

  // Native form reset restores input.checked to defaultChecked but does not
  // fire onChange, so currentState never changes
  useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    if (!input || !form) return;

    function handleReset() {
      // The reset event fires before the browser applies the reset
      // algorithm (restoring each control's value)
      setTimeout(() => {
        if (!inputRef.current) return;
        // Explicitly set indeterminate if it was passed as prop from parent
        inputRef.current.indeterminate = indeterminate;
        setCurrentState(
          indeterminate
            ? "indeterminate"
            : inputRef.current.checked
              ? "checked"
              : "unchecked",
        );
        if (group && !skipGroup && name) {
          group.update(name, inputRef.current.checked);
        }
      }, 0);
    }

    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, [group, skipGroup, name, indeterminate]);

  return (
    <div
      {...slotProps.root}
      className={cn(styles.root, className)}
      data-size={size}
      data-color={error ? "error" : color}
      data-error={!!error}
    >
      <span className={cn(styles.inputWrapper)}>
        {/* Start Icon */}
        {startIcon && (
          <span
            {...slotProps.startIcon}
            className={cn(styles.iconContainer, slotProps.startIcon?.className)}
          >
            {startIcon}
          </span>
        )}
        {/* Main Checkbox */}
        <span
          {...slotProps.checkbox}
          className={cn(styles.checkbox, slotProps.checkbox?.className)}
        >
          <input
            id={id}
            ref={mergeRefs(ref, inputRef)}
            type="checkbox"
            aria-checked={isIndeterminate ? "mixed" : isChecked}
            aria-label={ariaLabel ?? label}
            onChange={handleChange}
            className={cn(slotProps.input?.className, styles.input)}
            onTouchStart={eventWithRipple(createRipple, onTouchStart)}
            onClick={eventWithRipple(createRipple, onClick)}
            disabled={disabled}
            value={value}
            name={name}
            {...(checked !== undefined ? { checked } : { defaultChecked })}
            {...rest}
          />
          <span
            {...slotProps.checkboxIconsWrapper}
            className={cn(
              styles.checkboxIconsWrapper,
              slotProps.checkboxIconsWrapper?.className,
            )}
          >
            <span className={cn(styles.checkboxIconWrapper, styles.checked)}>
              {checkedIcon}
            </span>
            <span
              className={cn(styles.checkboxIconWrapper, styles.indeterminate)}
            >
              {indeterminateIcon}
            </span>
          </span>
          {rippleElements}
        </span>
        {/* Label */}
        <label
          {...slotProps.label}
          htmlFor={id}
          className={cn(slotProps.label?.className, styles.label)}
        >
          {label}
        </label>
        {/* End Icon */}
        {endIcon && (
          <span
            {...slotProps.endIcon}
            className={cn(styles.iconContainer, slotProps.endIcon?.className)}
          >
            {endIcon}
          </span>
        )}
      </span>
      {/* Helper text */}
      <InputHelperText
        {...slotProps.helperText}
        className={cn(styles.helperText, slotProps.helperText?.className)}
        text={error ?? helperText}
      />
    </div>
  );
}
{
  /*
    root
    |inputWrapper
    |   |startIcon
    |   |checkbox
    |   |   |input
    |   |   |checkboxIconsWrapper
    |   |   |ripple
    |   |label
    |   |endIcon
    |helperText
*/
}
