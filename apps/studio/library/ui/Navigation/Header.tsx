import { Paper, Stack } from "@mui/material";
import React from "react";
import TitleCrumbs from "../Typography/TitleCrumbs";

export default function Header() {
  return (
    <Stack
      component={Paper}
      direction={"row"}
      minHeight={"3.5rem"}
      alignItems={"center"}
      borderRadius={0}
    >
      <TitleCrumbs />
    </Stack>
  );
}
