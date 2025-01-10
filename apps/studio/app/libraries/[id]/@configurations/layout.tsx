import { ExpandMoreRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";

export default function ConfigurationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
        <Typography>Configurations</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          id={"configurations-container"}
          gap={2}
        >
          {children}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
