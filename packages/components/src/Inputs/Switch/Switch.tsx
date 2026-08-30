"use client";

import {
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ReactElement,
} from "react";
import { cn, mergeRefs } from "@cubicsui/utils";
import type { RenderSwitchIconsProps, SwitchProps } from "./Switch.types";
import "./Switch.styles.css";
import { TextOrList } from "../../Typography/TextOrList/TextOrList";

export function Switch(props: SwitchProps): ReactElement {
  const {
    id: _id,
    ref,
    className,
    checked,
    defaultChecked,
    disabled,
    onChange,

    label,
    size,
    color,
    helperText,
    error,
    thumbIcons,
    trackIcons,
    slotProps = {},
    ...inputProps
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const [isOn, setIsOn] = useState(defaultChecked || checked);
  const fallbackId = useId();
  const id = _id ?? fallbackId;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const c = e.currentTarget.checked;
    onChange?.(e, c);
    setIsOn(c);
  }
  // Mounting effect
  useEffect(() => {
    if (!inputRef.current) return;
    setIsOn(inputRef.current.checked || inputRef.current.defaultChecked);
  }, []);

  // Handle form reset
  useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    if (!input || !form) return;

    function handleReset() {
      setTimeout(() => {
        if (!inputRef.current) return;
        setIsOn(inputRef.current.checked || inputRef.current.defaultChecked);
      }, 0);
    }

    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  });

  return (
    <div
      className={cn("Switch_root")}
      data-color={error ? "error" : color}
      data-size={size}
      data-error={!!error}
    >
      <div className={cn("Switch_inputWrapper")}>
        <div className={cn("Switch_switch")}>
          <input
            {...inputProps}
            id={id}
            type={"checkbox"}
            ref={mergeRefs(ref, inputRef)}
            className={cn(className, "Switch_input")}
            role="switch"
            aria-checked={isOn}
            onChange={handleChange}
            disabled={disabled}
            {...(checked !== undefined ? { checked } : { defaultChecked })}
          />
          <span
            className={cn("Switch_track")}
            onClick={() => {
              inputRef.current?.click();
            }}
            aria-hidden="true"
          >
            <RenderSwitchIcons
              className="Switch_trackIcons"
              icons={trackIcons}
            />
            <span ref={thumbRef} className={cn("Switch_thumb")}>
              <RenderSwitchIcons
                className="Switch_thumbIcons"
                icons={thumbIcons}
              />
            </span>
          </span>
        </div>
        {label && (
          <label htmlFor={id} className={cn("Switch_label")}>
            {label}
          </label>
        )}
      </div>
      <TextOrList
        className={cn("Switch_helperText")}
        text={error ?? helperText}
      />
    </div>
  );
}
function RenderSwitchIcons(props: RenderSwitchIconsProps) {
  const { icons, ...rest } = props;
  const isRN = isValidElement(icons);
  if (typeof icons !== "object" || icons === null) return;
  if (isRN || Array.isArray(icons)) {
    return <span {...rest}>{icons}</span>;
  }
  if ("on" in icons || "off" in icons)
    return (
      <span {...rest}>
        {icons.on && <span className={cn("on")}>{icons.on}</span>}
        {icons.off && <span className={cn("off")}>{icons.off}</span>}
      </span>
    );
  return;
}
