import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import db from "@/db";
import ProjectProvider from "./providers";
import DeleteProjectButton from "./delete";
import { ExpandMoreRounded } from "@mui/icons-material";

interface ProjectLayoutProps {
  children: ReactNode;
  details: ReactNode;
  configurations: ReactNode;
  components: ReactNode;
  params: Promise<{ id: string }>;
}

export default async function ProjectLayout({
  children,
  details,
  configurations,
  components,
  params,
}: ProjectLayoutProps) {
  const id = (await params).id;
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

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            <Typography>Details</Typography>
          </AccordionSummary>
          <AccordionDetails>{details}</AccordionDetails>
        </Accordion>

        <Accordion expanded>
          <AccordionSummary>
            <Typography>Components</Typography>
          </AccordionSummary>
          <AccordionDetails>{components}</AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            <Typography>Configurations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              id={"configurations-container"}
              gap={2}
            >
              {configurations}
            </Stack>
          </AccordionDetails>
        </Accordion>
        <DeleteProjectButton />
      </Stack>
    </ProjectProvider>
  );
}
