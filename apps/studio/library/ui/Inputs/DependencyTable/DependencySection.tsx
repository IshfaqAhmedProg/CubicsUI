"use client";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import ExternalDependencyTable from "./ExternalDependencyTable";
import LocalDependencyTable from "./LocalDependencyTable";
import { ReactNode } from "react";
import { AutoFixHighRounded, ExpandMoreRounded } from "@mui/icons-material";
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
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="body2">
            Dependencies are how components are linked with one another and
            between external packages found in npm registry, you can
            automatically analyse and add your dependencies.
            <br />
            <Typography
              component={"span"}
              variant="body2"
              color="error"
            >
              Note* : Make sure all the dependencies are accounted for, and add
              dependencies that you think are missing below
            </Typography>
          </Typography>
          <Button
            variant="text"
            onClick={analyseDependencies}
            startIcon={<AutoFixHighRounded />}
            sx={{ minWidth: "max-content", height: "fit-content" }}
          >
            Analyse Dependencies
          </Button>
        </Stack>
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
