import { Stack, StackProps } from "@mui/material";
import React from "react";

export default function Viewport(props: StackProps) {
  const { children, ...rest } = props;

  return (
    <Stack
      id={"viewport"}
      width={"100%"}
      height={"calc(100vh - var(--header-height))"}
      pt={2}
      pl={2}
      boxSizing={"border-box"}
      overflow={"auto"}
      // sx={{ transition: "all 0.3s var(--transition-tf)" }}
      {...rest}
    >
      {children}
    </Stack>
  );
}
