import { Stack, StackProps } from "@mui/material";
import React from "react";

export default function Viewport(props: StackProps) {
  const { children, ...rest } = props;

  return (
    <Stack
      id={"viewport"}
      height={"calc(100vh - var(--header-height))"}
      pt={2}
      pl={2}
      boxSizing={"border-box"}
      overflow={"auto"}
      {...rest}
    >
      {children}
    </Stack>
  );
}
