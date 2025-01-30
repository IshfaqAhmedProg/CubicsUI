import React, { ComponentProps, ReactNode } from "react";

interface Exotic extends ComponentProps<"code"> {
  children: ReactNode;
}

export default function Exotic({ children, ...rest }: Exotic) {
  return (
    <code
      className="code"
      {...rest}
    >
      {children}
    </code>
  );
}
