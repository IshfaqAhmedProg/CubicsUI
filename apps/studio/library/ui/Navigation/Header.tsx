import { Paper, Stack } from "@mui/material";
import React from "react";
import TitleCrumbs from "../Typography/TitleCrumbs";

export default function Header() {
  return (
    <Stack
      component={Paper}
      direction={"row"}
      minHeight={"var(--header-height)"}
      alignItems={"center"}
      borderRadius={0}
      pl={2}
      sx={{ transition: "all 0.3s var(--transition-tf)" }}
    >
      <TitleCrumbs />
    </Stack>
  );
}
