import type { ComponentPropsWithRef, ElementType, ReactElement } from "react";

export type GenericReactElement<C extends ElementType = ElementType> =
  ReactElement<ComponentPropsWithRef<C>, C>;
