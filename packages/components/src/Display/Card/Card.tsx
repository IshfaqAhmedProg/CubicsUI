"use client";

import type {
  PolymorphicComponentProps,
  PolymorphicComponentType,
} from "@cubicsui/types";
import { type ElementType } from "react";

import { cn } from "@cubicsui/utils";
import type { CardBaseProps } from "./Card.types";
import styles from "./Card.module.css";

const defaultElement = "div";
type DefaultElement = typeof defaultElement;
/**
 * Polymorphic props for the Card component.
 *
 * `C` defines the element type rendered by the component (e.g. `"a"`, `"div"`).
 * All intrinsic props for `C` are supported unless overridden by `CardBaseProps`.
 *
 */
export type CardProps<C extends ElementType = DefaultElement> =
  PolymorphicComponentProps<C, CardBaseProps>;

/**
 * Base implementation for the Card component.
 *
 * This is a polymorphic component that defaults to rendering a `<div>`.
 * Use the `as` prop to change the underlying element.
 *
 * @typeParam C - The intrinsic or custom element type to render.
 *
 */
function CardBase<C extends ElementType = DefaultElement>(props: CardProps<C>) {
  const {
    as,
    className,
    variant = "contained",
    size = "md",
    fullWidth = false,
    fullHeight,
    fullScreen,
    square,
    disablePadding = false,
    ref,
    ...restProps
  } = props;
  const Component = (as || defaultElement) as ElementType;

  const componentProps = {
    className: cn(
      className,
      styles.root,
      square && styles.square,
      fullWidth && styles.fullWidth,
      fullHeight && styles.fullHeight,
      fullScreen && styles.fullScreen,
      disablePadding && styles.disablePadding,
      variant && styles[`variant_${variant}`],
    ),
    "data-size": size,
    ref,
    ...restProps,
  };

  return <Component {...componentProps} />;
}

CardBase.displayName = "Card";

/**
 * A polymorphic Card component.
 *
 * By default it renders a `<Card>`, but any element can be used via the `as` prop:
 *
 * ```tsx
 * <Card as="a" href="/docs">Read docs</Card>
 * ```
 *
 */
export const Card = CardBase as PolymorphicComponentType<
  CardBaseProps,
  DefaultElement
>;
