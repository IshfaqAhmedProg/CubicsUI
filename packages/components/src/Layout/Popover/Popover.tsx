"use client";

import type { PolymorphicComponentType } from "@cubicsui/types";
import { cn } from "@cubicsui/utils";
import type { CSSProperties, ElementType } from "react";
import type { PopoverBaseProps, PopoverProps } from "./Popover.types";
import "./Popover.styles.css";

function PopoverBase<C extends ElementType = "div">(props: PopoverProps<C>) {
  const {
    as,
    children,
    className,
    style,
    positionArea = "bottom center",
    transformOrigin = "top center",
    popover = "auto",
    ...rest
  } = props as PopoverProps<"div">;
  const Component = as || "div";
  const componentProps = {
    ...rest,
    popover: popover,
    className: cn(className, "Popover_root"),
    style: {
      ...style,
      "--popover-position-area": positionArea,
      "--popover-transform-origin": transformOrigin,
    } as CSSProperties,
  };
  return <Component {...componentProps}>{children}</Component>;
}

PopoverBase.displayName = "Popover";

/**
 * A polymorphic popover component.
 * By default it renders a `<div>`, but any element can be used via the `as` prop.
 *
 * ```tsx
 * <Popover as="article" href="/docs">...</Popover>
 * ```
 */
export const Popover = PopoverBase as PolymorphicComponentType<
  PopoverBaseProps,
  "div"
>;
