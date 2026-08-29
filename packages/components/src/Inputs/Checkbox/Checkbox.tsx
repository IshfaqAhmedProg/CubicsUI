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
import type { CheckboxCurrentState, CheckboxProps } from "./Checkbox.types";
import { useCheckbox } from "./CheckboxProvider";
import {
  CheckIconAnimated,
  DashIconAnimated,
} from "./CheckboxIcons/CheckboxIcons";
import { TextOrList } from "../../Typography/TextOrList/TextOrList";
import "./Checkbox.styles.css";

export function Checkbox(props: CheckboxProps): ReactElement {
  const {
    ref,
    rootClass,
    className,
    label,
    id: _id,
    name,
    checked,
    indeterminate = false,
    defaultChecked,
    value,
    skipGroup,
    size = "md",
    color,
    disabled,
    error,
    helperText,
    "aria-label": ariaLabel,
    checkedIcon = <CheckIconAnimated />,
    indeterminateIcon = <DashIconAnimated />,
    slotProps = {},
    onChange,
    onTouchStart,
    onClick,
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
  const stringLabel = typeof label === "string" ? label : undefined;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (disabled) return;
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
    if (group && !skipGroup && !isRegistered.current && name && !disabled) {
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
    if (!isRegistered.current || !inputRef.current || !name || disabled) return;
    inputRef.current.checked = group.values[name];
    setCurrentState(group.values[name] ? "checked" : "unchecked");
  }, [group.values, name]);

  // Native form reset restores input.checked to defaultChecked but does not
  // fire onChange, so currentState never changes, this effect handles that
  useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    if (!input || !form) return;

    function handleReset() {
      // The reset event fires before the browser applies the reset
      // algorithm
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
      className={cn(rootClass, slotProps.root?.className, "Checkbox_root")}
      data-size={size}
      data-color={error ? "error" : color}
      data-error={!!error}
    >
      <div
        {...slotProps.inputWrapper}
        className={cn(
          slotProps.inputWrapper?.className,
          "Checkbox_inputWrapper",
        )}
      >
        {/* Main Checkbox */}
        <span
          {...slotProps.checkbox}
          className={cn(slotProps.checkbox?.className, "Checkbox_checkbox")}
        >
          <input
            id={id}
            ref={mergeRefs(ref, inputRef)}
            type="checkbox"
            aria-checked={isIndeterminate ? "mixed" : isChecked}
            aria-label={ariaLabel ?? stringLabel}
            onChange={handleChange}
            className={cn(className, "Checkbox_input")}
            onTouchStart={eventWithRipple(createRipple, onTouchStart)}
            onClick={eventWithRipple(createRipple, onClick)}
            disabled={disabled}
            value={value}
            name={name}
            {...(checked !== undefined ? { checked } : { defaultChecked })}
            {...rest}
          />
          <span
            {...slotProps.checkIconsWrapper}
            className={cn(
              slotProps.checkIconsWrapper?.className,
              "Checkbox_checkIconsWrapper",
            )}
          >
            <span
              {...slotProps.checkedIcon}
              className={cn(
                slotProps.checkedIcon?.className,
                "Checkbox_checkedIcon",
              )}
            >
              {checkedIcon}
            </span>
            <span
              {...slotProps.indeterminateIcon}
              className={cn(
                slotProps.indeterminateIcon?.className,
                "Checkbox_indeterminateIcon",
              )}
            >
              {indeterminateIcon}
            </span>
          </span>
          {rippleElements}
        </span>
        {/* Label */}
        {label && (
          <label
            {...slotProps.label}
            htmlFor={id}
            className={cn(slotProps.label?.className, "Checkbox_label")}
          >
            {label}
          </label>
        )}
      </div>
      {/* Helper text */}
      <TextOrList
        {...slotProps.helperText}
        className={cn(slotProps.helperText?.className, "Checkbox_helperText")}
        text={error ?? helperText}
      />
    </div>
  );
}
