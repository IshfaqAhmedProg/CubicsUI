import type { ComponentProps } from "react";
import type { InputFieldSharedProps, InputFieldSlotProps } from "../InputField/InputField.types";

export interface TextInputProps
  extends InputFieldSharedProps, Omit<ComponentProps<"input">, "size"> {
  /** Only text type inputs are allowed here */
  type?: "text" | "email" | "search" | "tel" | "url";

  /** size attribute of the html `<input size=""/>` element */
  htmlSize?: ComponentProps<"input">["size"];

  /**
   * Slot props for customizing internal elements.
   *  ```
   *  root
   *   |label
   *   |inputSurface
   *   |   |startIcon
   *   |   |inputWrapper
   *   |   |   |input
   *   |   |endIcon
   *   |   |ripple
   *   |helperText
   * ```
   * @link TextInputSlotProps
   *
   */
  slotProps?: InputFieldSlotProps;
}
