import { Stack, StackProps } from "@mui/material";
import React from "react";

export default function Viewport(props: StackProps) {
  const { children, ...rest } = props;

  return (
    <Stack
      // Subtracting the sidebar's width
      width={"calc(100vw - var(--sidebar-width))"}
      height={"100vh"}
      overflow={"auto"}
      {...rest}
    >
      {children}
    </Stack>
  );
}
