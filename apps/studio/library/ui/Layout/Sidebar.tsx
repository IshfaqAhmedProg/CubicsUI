"use client";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import ThemeSwitch from "../Inputs/ThemeSwitch";
import Link from "next/link";
import {
  MenuOpenRounded,
  PublishRounded,
  ViewModuleRounded,
} from "@mui/icons-material";

export type SidebarProps = {
  brand?: ReactNode;
};
const sidebarLinks = [
  {
    label: "Components",
    href: "/components",
    icon: <ViewModuleRounded />,
  },
  {
    label: "Publish",
    href: "/publish",
    icon: <PublishRounded />,
  },
];

export default function Sidebar({ brand }: SidebarProps) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (typeof window == "undefined") return;
    if (open) {
      document.body.style.setProperty("--sidebar-width", "3rem");
    } else {
      document.body.style.setProperty("--sidebar-width", "13rem");
    }
  }, [open]);
  return (
    <Stack
      component={Paper}
      width={"var(--sidebar-width)"}
      borderRadius={0}
      sx={{ transition: "all 0.3s var(--transition-tf)" }}
      gap={3}
    >
      {brand && (
        <Stack
          mt={5}
          gap={"inherit"}
          alignItems={"center"}
        >
          {brand}
        </Stack>
      )}
      <Stack alignItems={"flex-end"}>
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ flexGrow: 0 }}
        >
          <MenuOpenRounded
            color="disabled"
            sx={{ rotate: open ? "180deg" : "0" }}
          />
        </IconButton>
      </Stack>
      <List sx={{ flexGrow: 1, overflow: "hidden auto" }}>
        {sidebarLinks.map((sl, i) => {
          return (
            <ListItem
              key={i}
              disablePadding
            >
              <ListItemButton
                LinkComponent={Link}
                href={sl.href}
                sx={{ fontWeight: "bold" }}
              >
                {sl.icon}
                {sl.label}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <ThemeSwitch />
    </Stack>
  );
}
