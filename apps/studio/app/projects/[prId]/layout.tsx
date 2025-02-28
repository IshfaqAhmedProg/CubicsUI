import { Grid2 as Grid, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import db from "@/db";
import ProjectProvider from "../../../library/contexts/ProjectContext";
import DeleteProjectButton from "./delete";
import { ExpandMoreRounded } from "@mui/icons-material";
import CollapsibleSection from "@/library/ui/Layout/CollapsibleSection";
import DeleteWithConfirmation from "@/library/ui/Inputs/DeleteWithConfirmation";
import { deleteProjectAction } from "../actions";

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
      <Grid
        container
        spacing={2}
        height={"100%"}
      >
        {children}

        <Grid
          size={6}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          height={"100%"}
          overflow={"hidden auto"}
        >
          <CollapsibleSection
            title={"Details"}
            defaultExpanded
            expandIcon={<ExpandMoreRounded />}
          >
            {details}
          </CollapsibleSection>

          {configurations}
          <DeleteWithConfirmation
            itemToDelete={project.name}
            formDatas={[{ name: "prId", value: project.id }]}
            deleteAction={deleteProjectAction}
            deleteMessage={`Are you sure you want to delete "${project.name}" and
                all its configurations and components? This action is
                irreversible.`}
            redirectTo="/projects"
          />
        </Grid>
        <Grid size={6}>{components}</Grid>
      </Grid>
    </ProjectProvider>
  );
}
