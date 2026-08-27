"use client";

import type {
  PolymorphicComponentProps,
  PolymorphicComponentType,
} from "@cubicsui/types";
import { type ElementType, type ReactElement } from "react";
import { eventWithRipple, useRipple } from "../../Misc/Ripple/Ripple";
import { cn } from "@cubicsui/utils";
import type { ButtonBaseProps } from "./Button.types";
import "./Button.styles.css";

/**
 * Polymorphic props for the Button component.
 *
 * `C` defines the element type rendered by the component (e.g. `"button"`, `"a"`, `"div"`).
 * All intrinsic props for `C` are supported unless overridden by `ButtonBaseProps`.
 *
 */
export type ButtonProps<C extends ElementType = "button"> =
  PolymorphicComponentProps<C, ButtonBaseProps>;

/**
 * Base implementation for the Button component.
 *
 * This is a polymorphic component that defaults to rendering a `<button>`.
 * Use the `as` prop to change the underlying element.
 *
 * @typeParam C - The intrinsic or custom element type to render.
 *
 */
function ButtonBase<C extends ElementType = "button">(
  props: ButtonProps<C>,
): ReactElement {
  const {
    as,
    className,
    children,
    variant,
    size = "md",
    color = "default",
    startIcon,
    endIcon,
    icon,
    fullWidth = false,
    onTouchStart,
    onClick,
    disabled,
    slotProps: _slotProps,
    ...restProps
  } = props as ButtonProps<"button">;
  const slotProps: NonNullable<ButtonBaseProps["slotProps"]> = _slotProps ?? {};
  const Component = (as || "button") as ElementType;
  const { rippleElements, createRipple } = useRipple(slotProps.ripple);

  const componentProps = {
    className: cn(
      className,
      "Button_root",
      icon && "Button_type_icon",
      fullWidth && "Button_fullWidth",
      disabled && "Button_disabled",
      variant && `Button_variant_${variant}`,
    ),
    onTouchStart: eventWithRipple(createRipple, onTouchStart),
    onClick: eventWithRipple(createRipple, onClick),
    "data-color": color,
    "data-size": size,
    ...restProps,
  };

  return (
    <Component {...componentProps}>
      {startIcon && (
        <span
          {...slotProps.startIcon}
          className={cn("Button_icon", slotProps.startIcon?.className)}
        >
          {startIcon}
        </span>
      )}
      {children}
      {endIcon && (
        <span
          {...slotProps.endIcon}
          className={cn("Button_icon", slotProps.endIcon?.className)}
        >
          {endIcon}
        </span>
      )}
      {rippleElements}
    </Component>
  );
}

ButtonBase.displayName = "Button";

/**
 * A polymorphic button component.
 * By default it renders a `<button>`, but any element can be used via the `as` prop.
 *
 * ```tsx
 * <Button as="a" href="/docs">...</Button>
 * ```
 */
export const Button = ButtonBase as PolymorphicComponentType<
  ButtonBaseProps,
  "button"
>;
