"use client";
import {
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import ThemeSwitch from "../Inputs/ThemeSwitch";
import Link from "next/link";
import {
  MenuOpenRounded,
  PublishRounded,
  ViewModuleRounded,
} from "@mui/icons-material";
import { LogoHorizontal } from "../Brand/Logos";

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
    if (!open) {
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
      <Stack
        mt={5}
        gap={"inherit"}
        alignItems={"center"}
      >
        <LogoHorizontal
          shorten={!open}
          sx={{
            width: "100%",
            color: open ? "text.disabled" : "text.primary",
            transition: "color 0.3s var(--transition-tf)",
          }}
        />
      </Stack>
      <List sx={{ p: 0, flexGrow: 1, overflow: "hidden auto" }}>
        <ListItem>
          <ListItemButton
            onClick={() => setOpen(!open)}
            sx={{ justifyContent: open ? "flex-end" : "flex-start" }}
          >
            <MenuOpenRounded
              color="disabled"
              sx={{ rotate: !open ? "180deg" : "0" }}
            />
          </ListItemButton>
        </ListItem>
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
