import { List, ListItem, ListItemButton, Paper, Stack } from "@mui/material";
import { ReactNode } from "react";
import ThemeSwitch from "../Inputs/ThemeSwitch";
import Link from "next/link";

export type SidebarProps = {
  brand?: ReactNode;
};
const sidebarLinks = [
  {
    label: "Components",
    href: "/components",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];

export default function Sidebar({ brand }: SidebarProps) {
  return (
    <Stack
      component={Paper}
      width={"var(--sidebar-width)"}
      borderRadius={0}
      px={3}
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
      <List sx={{ mt: 5 }}>
        {sidebarLinks.map((sl) => {
          return (
            <ListItem
              key={sl.href}
              disablePadding
            >
              <ListItemButton
                LinkComponent={Link}
                href={sl.href}
                sx={{ fontWeight: "bold", fontFamily: "var(--font-h)" }}
              >
                {sl.label}
              </ListItemButton>
            </ListItem>
          );
        })}
        <ThemeSwitch />
      </List>
    </Stack>
  );
}
