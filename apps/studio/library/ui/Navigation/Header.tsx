import { Paper, Stack } from "@mui/material";
import React from "react";
import TitleCrumbs from "../Typography/TitleCrumbs";

export default function Header() {
  return (
    <Stack
      component={Paper}
      direction={"row"}
      height={"3.5em"}
      alignItems={"center"}
      borderRadius={0}
    >
      <TitleCrumbs />
    </Stack>
  );
}
