import type { ComponentProps, ReactElement } from "react";
import { cn } from "@cubicsui/utils";
import styles from "./PasswordVisibilityToggle.module.css";
import type { PasswordVisibilityToggleProps } from "../PasswordInput.types";

export function PasswordVisibilityToggle(
  props: PasswordVisibilityToggleProps,
): ReactElement {
  const { showPass, inputId, className, ...rest } = props;
  return (
    <button
      className={cn(className, styles.root)}
      aria-pressed={showPass}
      aria-controls={inputId}
      type="button"
      aria-label="Show password"
      {...rest}
    >
      {!showPass ? <EyeIcon /> : <EyeOffIcon />}
    </button>
  );
}
function EyeIcon(props: ComponentProps<"svg">) {
  const { width = 24, height = width, ...rest } = props;
  return (
    <svg
      fill="none"
      stroke="currentColor"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className="lucide"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon(props: ComponentProps<"svg">) {
  const { width = 24, height = width, ...rest } = props;
  return (
    <svg
      fill="none"
      stroke="currentColor"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className="lucide"
    >
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  );
}
