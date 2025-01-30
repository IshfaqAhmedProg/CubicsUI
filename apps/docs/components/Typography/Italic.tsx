import { ComponentProps, ReactNode } from "react";

interface ItalicProps extends ComponentProps<"i"> {
  children: ReactNode;
}

export default function Italic({ children, ...props }: ItalicProps) {
  return <i {...props}>{children}</i>;
}
