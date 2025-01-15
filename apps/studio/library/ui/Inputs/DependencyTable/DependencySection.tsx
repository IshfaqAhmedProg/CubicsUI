"use client";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import ExternalDependencyTable from "./ExternalDependencyTable";
import LocalDependencyTable from "./LocalDependencyTable";
import { ReactNode } from "react";
import { ExpandMoreRounded } from "@mui/icons-material";
import CollapsibleSection from "../../Layout/CollapsibleSection";
import { useComponentForm } from "@/app/components/create/providers";

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

export default function DependencySection() {
  const { analyseDependencies } = useComponentForm();

  return (
    <CollapsibleSection
      expandIcon={<ExpandMoreRounded />}
      defaultExpanded
      title="Dependencies"
    >
      <Stack gap={3}>
        <Button onClick={analyseDependencies}>
          Analyse Dependencies from script
        </Button>
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
      </Stack>
    </CollapsibleSection>
  );
}
