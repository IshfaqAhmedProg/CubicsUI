import { ExpandMoreRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  AccordionProps,
} from "@mui/material";
import { ReactNode } from "react";

interface CollapsibleSectionProps extends Omit<AccordionProps, "children"> {
  title: string;
  children: ReactNode;
  expandIcon?: ReactNode;
}

export default function CollapsibleSection(props: CollapsibleSectionProps) {
  const { title, expandIcon, children, ...rest } = props;

  return (
    <Accordion {...rest}>
      <AccordionSummary expandIcon={expandIcon}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
