import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  AccordionProps,
  AccordionSummaryProps,
  AccordionDetailsProps,
} from "@mui/material";
import { ReactNode } from "react";

interface CollapsibleSectionProps extends Omit<AccordionProps, "children"> {
  title: string;
  children: ReactNode;
  expandIcon?: ReactNode;
  summaryProps?: AccordionSummaryProps;
  detailsProps?: AccordionDetailsProps;
}

export default function CollapsibleSection(props: CollapsibleSectionProps) {
  const { title, expandIcon, children, summaryProps, detailsProps, ...rest } =
    props;

  return (
    <Accordion {...rest}>
      <AccordionSummary
        expandIcon={expandIcon}
        {...summaryProps}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails {...detailsProps}>{children}</AccordionDetails>
    </Accordion>
  );
}
