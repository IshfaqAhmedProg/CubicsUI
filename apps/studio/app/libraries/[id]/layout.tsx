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
import LibraryProvider from "./providers";
import DeleteLibraryButton from "./delete";
import { ExpandMoreRounded } from "@mui/icons-material";

interface LibraryLayoutProps {
  children: ReactNode;
  details: ReactNode;
  configurations: ReactNode;
  components: ReactNode;
  params: Promise<{ id: string }>;
}

export default async function LibraryLayout({
  children,
  details,
  configurations,
  components,
  params,
}: LibraryLayoutProps) {
  const id = (await params).id;
  if (!id) return notFound();

  const library = await db.libraries.findFirst({ where: { id } });
  if (!library)
    return (
      <Typography color="error">
        Library with id:{id} does not exist in the database
      </Typography>
    );

  return (
    <LibraryProvider library={library}>
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
        <DeleteLibraryButton />
      </Stack>
    </LibraryProvider>
  );
}
