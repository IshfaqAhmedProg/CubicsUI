"use client";
import { Stack, StackProps } from "@mui/material";
import Cursor from "../Navigation/Cursor/Cursor";
import Sidebar from "./Sidebar";
import Viewport from "./Viewport";
import Header from "../Navigation/Header";
import { createContext, ReactNode, useContext } from "react";
import useDisclosure from "@/library/hooks/useDisclosure";

export type AppContainerValue = {
  sidebarControls: ReturnType<typeof useDisclosure>;
};

const AppContainerContext = createContext<AppContainerValue | null>(null);

export function useAppContainer() {
  const c = useContext(AppContainerContext);
  if (c == null)
    throw new Error("Components must be wrapped with <AppContainerProvider/>");
  return c;
}

export default function AppContainer({
  children,
  ...rest
}: { children: Readonly<ReactNode> } & StackProps) {
  const sidebarControls = useDisclosure(true);

  return (
    <AppContainerContext.Provider value={{ sidebarControls }}>
      <Stack
        direction={"row"}
        height={"100vh"}
        position={"relative"}
        {...rest}
      >
        <Cursor />
        <Sidebar />
        <Stack width={"100%"}>
          <Header />
          <Viewport>{children}</Viewport>
        </Stack>
      </Stack>
    </AppContainerContext.Provider>
  );
}
