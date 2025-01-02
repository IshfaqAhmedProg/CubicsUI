import { Paper, Stack } from "@mui/material";
import TitleCrumbs from "../Typography/TitleCrumbs";
import SidebarToggle from "../Inputs/SidebarToggle";

export default function Header() {
  return (
    <Stack
      component={Paper}
      direction={"row"}
      minHeight={"var(--header-height)"}
      alignItems={"center"}
      borderRadius={0}
    >
      <SidebarToggle />
      <TitleCrumbs />
    </Stack>
  );
}
