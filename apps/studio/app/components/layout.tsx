import { Stack } from "@mui/material";
import { ReactNode } from "react";

export default function layout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return <Stack>{children}</Stack>;
}
