"use client";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { ReactNode } from "react";
import ThemeSwitch from "../Inputs/ThemeSwitch";
import Link from "next/link";
import {
  ArticleRounded,
  LibraryBooksRounded,
  PublishRounded,
  ViewModuleRounded,
} from "@mui/icons-material";
import { LogoHorizontal } from "../Brand/Logos";
import { useAppContainer } from "./AppContainer";

export type SidebarProps = {
  brand?: ReactNode;
};
const sidebarLinks = [
  {
    label: "Libraries",
    href: "/libraries",
    icon: <LibraryBooksRounded />,
  },
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

export default function Sidebar() {
  const {
    sidebarControls: { open },
  } = useAppContainer();

  return (
    <Stack
      component={Paper}
      width={"var(--sidebar-width)"}
      borderRadius={0}
      sx={{ transition: "all 0.3s var(--transition-tf)" }}
      boxSizing={"border-box"}
      pt={4}
      gap={3}
    >
      <LogoHorizontal
        shorten={!open}
        sx={{
          width: "100%",
          color: open ? "text.secondary" : "text.primary",
          transition: "color 0.3s var(--transition-tf)",
        }}
      />

      <List
        sx={{
          mt: open ? 4 : 1,
          transition: "inherit",
          p: 0,
          flexGrow: 1,
          overflow: "hidden auto",
          color: "text.secondary",
        }}
      >
        {sidebarLinks.map((sl, i) => {
          return (
            <ListItem
              key={i}
              disablePadding
            >
              <Tooltip
                title={sl.label}
                placement="right"
              >
                <ListItemButton
                  LinkComponent={Link}
                  href={sl.href}
                  sx={{ fontWeight: "bold" }}
                >
                  {sl.icon}
                  {open && sl.label}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
      <ThemeSwitch />
    </Stack>
  );
}
