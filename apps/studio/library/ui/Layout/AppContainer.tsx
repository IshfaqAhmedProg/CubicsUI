import { Stack, StackProps } from "@mui/material";
import Cursor from "../Navigation/Cursor/Cursor";
import Sidebar from "./Sidebar";
import Viewport from "./Viewport";
import { LogoHorizontal } from "@/library/ui/Brand/Logos";
import Header from "../Navigation/Header";

export default function AppContainer(props: StackProps) {
  const { children, ...rest } = props;

  return (
    <Stack
      direction={"row"}
      height={"100vh"}
      position={"relative"}
      {...rest}
    >
      <Cursor />
      <Sidebar brand={<LogoHorizontal width={"10em"} />} />
      <Viewport>
        <Header />
        {children}
      </Viewport>
    </Stack>
  );
}
