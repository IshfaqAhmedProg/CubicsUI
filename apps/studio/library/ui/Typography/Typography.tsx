import React, { ComponentProps, CSSProperties } from "react";

export type TypographyProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  color?: CSSProperties["color"];
  bold?: boolean;
  textDecoration?: CSSProperties["textDecoration"];
};

export default function Typography(
  props: TypographyProps & ComponentProps<"h1" | "h2" | "h3" | "h4" | "p">
) {
  const {
    as = "p",
    color,
    bold,
    textDecoration,
    children,
    style,
    ...rest
  } = props;
  const Component = as;
  const styles: CSSProperties = {
    fontWeight: bold ? "bold" : undefined,
    color,
    textDecoration,
    ...style,
  };

  return (
    <Component
      {...rest}
      style={styles}
    >
      {children}
    </Component>
  );
}
