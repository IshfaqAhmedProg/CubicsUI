import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { AddRounded, ExpandMoreRounded } from "@mui/icons-material";
import AddConfigButton, { SuggestedConfigs } from "./configurations";
import db from "@/db";
import { notFound } from "next/navigation";
import LibraryDetails, { DeleteLibraryButton } from "./details";

export default async function CreateLibraryForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const library = await db.libraries.findFirst({
    where: { id },
    include: { configurations: true },
  });

  if (!id || !library) return notFound();

  return (
    <Stack
      component={"form"}
      gap={3}
    >
      <LibraryDetails library={library} />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreRounded />}>
          <Typography fontFamily={"var(--font-h)"}>Configurations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack id={"configurations-container"}>
            <Stack
              id={"configurations-controls"}
              alignItems={"flex-end"}
            >
              <AddConfigButton
                library={library}
                variant="text"
                startIcon={<AddRounded />}
              >
                Add New
              </AddConfigButton>
            </Stack>
            <SuggestedConfigs library={library} />

            <Stack
              direction={"row"}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              mt={4}
            >
              {library.configurations.map((c) => (
                <Button
                  key={c.id}
                  variant="outlined"
                >
                  {c.name}
                </Button>
              ))}
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <DeleteLibraryButton library={library} />
    </Stack>
  );
}