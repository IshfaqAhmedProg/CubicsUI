import {
  Stack,
  Typography
} from "@mui/material";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import db from "@/db";
import ProjectProvider from "../../../library/contexts/ProjectContext";
import DeleteProjectButton from "./delete";
import { ExpandMoreRounded } from "@mui/icons-material";
import CollapsibleSection from "@/library/ui/Layout/CollapsibleSection";

interface ProjectLayoutProps {
  children: ReactNode;
  details: ReactNode;
  configurations: ReactNode;
  components: ReactNode;
  params: Promise<{ prId: string }>;
}

export default async function ProjectLayout({
  children,
  details,
  configurations,
  components,
  params,
}: ProjectLayoutProps) {
  const id = (await params).prId;
  if (!id) return notFound();

  const project = await db.projects.findFirst({ where: { id } });
  if (!project)
    return (
      <Typography color="error">
        Project with id:{id} does not exist in the database
      </Typography>
    );

  return (
    <ProjectProvider project={project}>
      <Stack gap={3}>
        {children}

        <CollapsibleSection
          title={"Details"}
          defaultExpanded
          expandIcon={<ExpandMoreRounded />}
        >
          {details}
        </CollapsibleSection>

        <CollapsibleSection
          title="Components"
          expanded
        >
          {components}
        </CollapsibleSection>

        <CollapsibleSection
          title="Configurations"
          defaultExpanded
          expandIcon={<ExpandMoreRounded />}
        >
          {configurations}
        </CollapsibleSection>
        <DeleteProjectButton />
      </Stack>
    </ProjectProvider>
  );
}
