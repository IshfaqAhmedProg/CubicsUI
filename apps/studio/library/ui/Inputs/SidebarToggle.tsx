"use client";

import { MenuOpenRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAppContainer } from "../Layout/AppContainer";
import { useEffect } from "react";

export default function SidebarToggle() {
  const {
    sidebarControls: { open, handleToggle },
  } = useAppContainer();

  useEffect(() => {
    if (typeof window == "undefined") return;
    if (!open) {
      document.body.style.setProperty("--sidebar-width", "3rem");
    } else {
      document.body.style.setProperty("--sidebar-width", "13rem");
    }
  }, [open]);
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
