import { Stack, StackProps } from "@mui/material";
import React from "react";

export default function Viewport(props: StackProps) {
  const { children, ...rest } = props;

  return (
    <Stack
      width={"calc(100vw - 13rem)"}
      {...rest}
    >
      {children}
    </Stack>
  );
}
