"use client";

import { MenuOpenRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAppContainer } from "../Layout/AppContainer";

export default function SidebarToggle() {
  const {
    sidebarControls: { open, handleToggle },
  } = useAppContainer();
 
  return (
    <IconButton
      onClick={handleToggle}
      sx={{
        justifyContent: open ? "flex-end" : "flex-start",
        color: open ? "text.primary" : "text.secondary",
      }}
    >
      <MenuOpenRounded sx={{ rotate: !open ? "180deg" : "0" }} />
    </IconButton>
  );
}
