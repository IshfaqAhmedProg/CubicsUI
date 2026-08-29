"use client";

import type { PolymorphicComponentType } from "@cubicsui/types";
import { type ElementType } from "react";
import { cn } from "@cubicsui/utils";
import type { ChipBaseProps, ChipProps } from "./Chip.types";
import "./Chip.styles.css";

function ChipBase<C extends ElementType = "span">(props: ChipProps<C>) {
  const {
    as,
    className,
    variant = "contained",
    color,
    size = "md",
    square,
    ...restProps
  } = props;
  const Component = (as || "span") as ElementType;

  const componentProps = {
    className: cn(className, "Chip_root", variant && `variant_${variant}`),
    "data-color": color,
    "data-size": size,
    ...restProps,
  };

  return <Component {...componentProps} />;
}
ChipBase.displayName = "Chip";

/**
 * A polymorphic chip component, sometimes also called tag.
 * By default it renders a `<span/>`, but any element can be used via the `as` prop.
 *
 * ```tsx
 * <Chip as="button">...</Chip>
 * ```
 */
export const Chip = ChipBase as PolymorphicComponentType<ChipBaseProps, "span">;
