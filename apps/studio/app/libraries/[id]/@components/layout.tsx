import { ExpandMoreRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { ReactNode } from "react";

export default function LibraryComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Accordion expanded>
      <AccordionSummary>
        <Typography>Components</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
