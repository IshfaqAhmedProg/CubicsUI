import type { ComponentProps, ReactElement } from "react";
import { cn } from "@cubicsui/utils";
import styles from "./Button.module.css";
export interface ButtonProps extends ComponentProps<"button"> {
  variant?: "default" | "contained" | "outlined";
}

export function Button(props: ButtonProps): ReactElement {
  const { variant = "default", ...rest } = props;
  return <button className={cn(styles.root, styles[variant])} {...rest} />;
}
