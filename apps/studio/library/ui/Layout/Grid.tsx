import { ComponentProps, CSSProperties, ElementType } from "react";
export type GridProps = {
  as?: ElementType;
  templateColumns?: CSSProperties["gridTemplateColumns"];
  templateRows?: CSSProperties["gridTemplateRows"];
  autoRows?: CSSProperties["gridAutoRows"];
  autoColumns?: CSSProperties["gridAutoColumns"];
  gap?: CSSProperties["gap"];
};

export default function Grid(props: GridProps & ComponentProps<"div">) {
  const {
    as = "div",
    templateColumns,
    templateRows,
    autoRows,
    autoColumns,
    gap,
    children,
    style,
    ...rest
  } = props;
  const Component = as;

  return (
    <Component
      style={{
        display: "grid",
        gridTemplateColumns: templateColumns,
        gridTemplateRows: templateRows,
        gridAutoColumns: autoColumns,
        gridAutoRows: autoRows,
        gap,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
