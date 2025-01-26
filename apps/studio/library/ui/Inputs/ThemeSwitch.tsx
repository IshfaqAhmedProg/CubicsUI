"use client";
import {
  ArrowRight,
  ComputerRounded,
  DarkModeRounded,
  LightModeRounded,
} from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { capitalize } from "lodash";
import { ReactNode, useState } from "react";
import { SidebarItem, SidebarItemProps } from "../Layout/Sidebar";
import { useAppContainer } from "../Layout/AppContainer";

export type ThemeMode = "dark" | "light" | "system";

export default function ThemeSwitch() {
  const { mode, setMode } = useColorScheme();

  const {
    sidebarControls: { open: sidebarOpen },
  } = useAppContainer();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const modes: SidebarItemProps["item"][] = [
    { label: "light", icon: LightModeRounded },
    { label: "dark", icon: DarkModeRounded },
    { label: "system", icon: ComputerRounded },
  ];
  const RenderedIcon = modes.find((m) => m.label == mode)?.icon;
  if (!mode) {
    return null;
  }
  return (
    <>
      <SidebarItem
        open={sidebarOpen}
        item={{
          label: `${capitalize(mode)} Mode`,
          icon: RenderedIcon,
          onClick: (e) => handleClick(e),
        }}
      />
      <Menu
        open={menuOpen}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        transformOrigin={{
          horizontal: "left",
          vertical: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              ml: 2,
            },
          },
        }}
      >
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <MenuItem
              key={mode.label}
              onClick={() => {
                setMode(mode.label as ThemeMode);
                handleClose();
              }}
            >
              <ListItemIcon>{Icon && <Icon />}</ListItemIcon>
              <ListItemText primary={capitalize(mode.label)} />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );

  // return (
  //   <select
  //     value={mode}
  //     onChange={(event) => {
  //       setMode(event.target.value as "light" | "dark" | "system");
  //     }}
  //   >
  //     <option value="system">System</option>
  //     <option value="light">Light</option>
  //     <option value="dark">Dark</option>
  //   </select>
  // );
}
