"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState, useState } from "react";
import { createLibraryAction } from "../actions";
import CodeEditor from "@/library/ui/Inputs/CodeEditor";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import { ExpandMoreRounded } from "@mui/icons-material";
import { samplePkgJson } from "@/library/constants/sampleCodeBlocks";
import { libraries } from "@cubicsui/db";
import AddConfigButton from "./create-config";

const initialState = {
  errors: {},
};
const files: { name: string; language: string; value: string }[] = [
  {
    name: "package.json",
    language: "json",
    value: samplePkgJson,
  },
];
export default function CreateLibraryForm({ library }: { library: libraries }) {
  return (
    <Stack
      component={"form"}
      gap={3}
    >
      <Stack alignItems={"flex-end"}>
        <Button
          type="submit"
          variant="contained"
        >
          {"Save"}
        </Button>
      </Stack>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreRounded />}>
          <Typography fontFamily={"var(--font-h)"}>Configurations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack alignItems={"flex-end"}>
            <AddConfigButton />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* {state?.errors ? JSON.stringify(state?.errors) : ""} */}
    </Stack>
  );
}
