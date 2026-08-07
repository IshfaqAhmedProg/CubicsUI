"use client";

import type {
  PolymorphicComponentProps,
  PolymorphicComponentType,
} from "@cubicsui/types";
import { type ElementType, type ReactElement } from "react";
import { eventWithRipple, useRipple } from "../../Misc/Ripple/Ripple";
import { cn } from "@cubicsui/utils";
import styles from "./Button.module.css";
import type { ButtonBaseProps } from "./Button.types";

const defaultElement = "button";
export type ButtonDefaultElement = typeof defaultElement;

/**
 * Polymorphic props for the Button component.
 *
 * `C` defines the element type rendered by the component (e.g. `"button"`, `"a"`, `"div"`).
 * All intrinsic props for `C` are supported unless overridden by `ButtonBaseProps`.
 *
 */
export type ButtonProps<C extends ElementType = ButtonDefaultElement> =
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
function ButtonBase<C extends ElementType = ButtonDefaultElement>(
  props: ButtonProps<C>,
): ReactElement {
  const {
    as,
    className,
    children,
    variant,
    size = "md",
    startIcon,
    color = "default",
    endIcon,
    square,
    fullWidth = false,
    onTouchStart,
    onClick,
    position,
    disabled,
    slotProps: _slotProps,
    ...restProps
  } = props as ButtonProps<ButtonDefaultElement>;
  const slotProps: NonNullable<ButtonBaseProps["slotProps"]> = _slotProps ?? {};
  const Component = (as || defaultElement) as ElementType;
  const { rippleElements, createRipple } = useRipple(slotProps.ripple);

  const componentProps = {
    className: cn(
      className,
      styles.root,
      square ? styles.square : "",
      fullWidth ? styles.fullWidth : "",
      disabled ? styles.disabled : "",
      position ? styles[`position_${position}`] : "",
      variant ? styles[variant] : "",
    ),
    onTouchStart: eventWithRipple(createRipple, onTouchStart),
    onClick: eventWithRipple(createRipple, onClick),
    "data-color": color,
    "data-size": size,
    ...restProps,
  };

  return (
    <Component {...componentProps}>
      {rippleElements}
      {startIcon && (
        <span
          {...slotProps.startIcon}
          className={cn(styles.icon, slotProps.startIcon?.className)}
        >
          {startIcon}
        </span>
      )}
      {children}
      {endIcon && (
        <span
          {...slotProps.endIcon}
          className={cn(styles.icon, slotProps.endIcon?.className)}
        >
          {endIcon}
        </span>
      )}
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
  ButtonDefaultElement
>;
