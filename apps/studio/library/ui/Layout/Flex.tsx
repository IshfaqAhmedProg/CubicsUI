import { ComponentProps, CSSProperties, ElementType } from "react";
export type FlexProps = {
  as?: ElementType;
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
  column?: boolean;
  gap?: CSSProperties["gap"];
};

export default function Flex(props: FlexProps & ComponentProps<"div">) {
  const {
    as = "div",
    justify,
    align,
    gap,
    column,
    children,
    style,
    ...rest
  } = props;
  const Component = as;
  return (
    <Component
      {...rest}
      style={{
        display: "flex",
        flexDirection: column ? "column" : undefined,
        justifyContent: justify,
        alignItems: align,
        gap,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
