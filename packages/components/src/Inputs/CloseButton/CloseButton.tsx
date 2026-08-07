import type { ReactElement } from "react";
import { Button } from "../Button/Button";
import { cn } from "@cubicsui/utils";
import styles from "./CloseButton.module.css";
import { XIcon } from "@cubicsui/icons";
import type { CloseButtonProps } from "./CloseButton.types";

export function CloseButton(props: CloseButtonProps): ReactElement {
  const { className, style, margin, position = "top right", ...rest } = props;
  const [y, x] = position.split(" ");

  return (
    <Button
      {...rest}
      square
      style={{ margin, position: "absolute", ...style }}
      className={cn(className, styles.root)}
      data-pos-y={y}
      data-pos-x={x}
    >
      <XIcon />
    </Button>
  );
}
