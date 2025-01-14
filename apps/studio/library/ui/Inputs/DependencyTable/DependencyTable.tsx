"use client";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import ExternalDependencyTable from "./ExternalDependencyTable";
import LocalDependencyTable from "./LocalDependencyTable";
import { ReactNode } from "react";

export function DependencySectionLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <Stack
      width={"100%"}
      gap={4}
    >
      <Typography variant="body2">{title}</Typography>
      <Stack gap={2}>{children}</Stack>
    </Stack>
  );
}

export default function DependencyTable() {
  return (
    <Stack
      component={Paper}
      direction={"row"}
      gap={2}
      px={3}
      py={4}
    >
      <ExternalDependencyTable />
      <Divider
        orientation="vertical"
        flexItem
      />
      <LocalDependencyTable />
    </Stack>
  );
}
