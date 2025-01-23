import { Typography, TypographyProps } from "@mui/material";
import React from "react";

export default function Title(props: TypographyProps) {
  const { children, ...rest } = props;

  return (
    <Typography
      fontFamily={"var(--font-h)"}
      color="text.secondary"
      fontSize={"1rem"}
      {...rest}
    >
      {children}
    </Typography>
  );
}
