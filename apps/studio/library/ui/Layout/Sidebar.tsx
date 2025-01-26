"use client";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  Paper,
  Stack,
  SvgIconTypeMap,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { MouseEventHandler } from "react";
import ThemeSwitch from "../Inputs/ThemeSwitch";
import Link from "next/link";
import {
  LibraryBooksRounded,
  PublishRounded,
  ViewModuleRounded,
} from "@mui/icons-material";
import { LogoHorizontal } from "../Brand/Logos";
import { useAppContainer } from "./AppContainer";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type SidebarItemProps = {
  open: boolean;
  item: {
    label: string;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    };
    href?: string;
    onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  };
};

export function SidebarItem({ open, item }: SidebarItemProps) {
  const asLink = item.href && {
    LinkComponent: Link,
    href: item.href,
  };
  const asButton: ListItemButtonProps = {
    onClick: item.onClick,
  };
  const Icon = item.icon;
  const iconCommonSx: SxProps = {
    fontSize: open ? "1em" : "1.5em",
    color: "text.secondary",
  };
  return (
    <ListItem disablePadding>
      <Tooltip
        title={open ? "" : item.label}
        placement="right"
      >
        <ListItemButton
          {...asLink}
          {...asButton}
        >
          {Icon && <Icon sx={iconCommonSx} />}
          {open && (
            <Typography
              color="text.secondary"
              minWidth={"max-content"}
            >
              {item.label}
            </Typography>
          )}
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}

export default function Sidebar() {
  const {
    sidebarControls: { open },
  } = useAppContainer();

  const sidebarItems: SidebarItemProps["item"][] = [
    {
      label: "Projects",
      href: "/projects",
      icon: LibraryBooksRounded,
    },
    {
      label: "Components",
      href: "/components",
      icon: ViewModuleRounded,
    },
    {
      label: "Publish",
      href: "/publish",
      icon: PublishRounded,
    },
  ];

  return (
    <Stack
      component={Paper}
      width={open ? "var(--sidebar-open)" : "var(--sidebar-closed)"}
      borderRadius={0}
      sx={{ transition: "width 0.3s var(--transition-tf)" }}
      boxSizing={"border-box"}
      pt={4}
      gap={3}
    >
      <LogoHorizontal
        shorten={!open}
        sx={{
          width: "100%",
          color: open ? "text.secondary" : "text.primary",
        }}
      />

      <List
        sx={{
          mt: open ? 4 : 1,
          transitionProperty: "margin-top, padding-inline",
          transitionDuration: "0.3s",
          transitionTimingFunction: "var(--transition-tf)",
          p: 0,
          px: open ? 2 : 0,
          flexGrow: 1,
          overflow: "hidden auto",
          color: "text.secondary",
        }}
      >
        {sidebarItems.map((sl, i) => (
          <SidebarItem
            open={open}
            item={sl}
            key={i}
          />
        ))}
      </List>
      <ThemeSwitch />
    </Stack>
  );
}
