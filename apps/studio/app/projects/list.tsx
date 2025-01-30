import { Stack, Typography } from "@mui/material";
import db from "@/db";
import ProjectCard from "@/library/ui/Layout/Cards/ProjectCard";
import Link from "next/link";

export default async function ProjectsList() {
  const projects = await db.projects.findMany({ take: 10 });

  return (
    <Stack gap={2}>
      {projects.length == 0 ? (
        <Typography>No projects found!</Typography>
      ) : (
        projects.map((project) => (
          <ProjectCard
            LinkComponent={Link}
            href={`/projects/${project.id}`}
            key={project.id}
            project={project}
          />
        ))
      )}
    </Stack>
  );
}
