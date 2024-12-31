import React, { ComponentProps } from "react";

export type TypographyProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "p";
};

export default function Typography(
  props: TypographyProps & ComponentProps<"h1" | "h2" | "h3" | "h4" | "p">
) {
  const { as = "p", children, ...rest } = props;
  const Component = as;
  return <Component {...rest}>{children}</Component>;
}
