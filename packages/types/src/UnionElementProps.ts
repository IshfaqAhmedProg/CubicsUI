import type { ComponentProps, ElementType, ReactElement } from "react";

/**
 * Explicitly mention the ElementTypes to only allow props of thos element
 * @example
 * type NewType = ExplicitPolymorphicProps<"p" | "ul">
 * // Either props of `p` or `ul`  will be selected depending on the `as` prop which can only be "p" or "ul"
 */
export type UnionElementProps<
  C extends ElementType,
  Props = object,
> = C extends ElementType
  ? Omit<ComponentProps<C>, keyof Props> & Props
  : never;

/**
 * Function type for a component built with `ExplicitPolymorphicProps`.
 * Unlike `PolymorphicComponentType`, there's no `as` prop, `C` is fixed
 * to the allowed element union, chosen internally by the component.
 */
export type UnionElementComponentType<C extends ElementType, Props> = (
  props: UnionElementProps<C, Props>,
) => ReactElement | null;
