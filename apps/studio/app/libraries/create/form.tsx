"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useActionState, useState } from "react";
import { createLibraryAction } from "../actions";
import CodeEditor from "@/library/ui/Inputs/CodeEditor";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import { ExpandMoreRounded } from "@mui/icons-material";
import { samplePkgJson } from "@/library/constants/sampleCodeBlocks";

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
export default function CreateLibraryForm() {
  const [state, formAction, pending] = useActionState(
    createLibraryAction,
    initialState
  );

  const [pkgJsonData, setPkgJsonData] = useState<string>(files[0].value);
  return (
    <Stack
      component={"form"}
      action={formAction}
      gap={3}
    >
      <Stack alignItems={"flex-end"}>
        <Button
          type="submit"
          variant="contained"
          disabled={pending}
        >
          {pending ? <Spinner /> : "Save"}
        </Button>
      </Stack>
      <TextField
        label="Library Name"
        required
        id="name"
        name="name"
      />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreRounded />}>
          <FormLabel htmlFor="pkgJson">package.json *</FormLabel>
        </AccordionSummary>
        <AccordionDetails>
          <CodeEditor
            textareaProps={{
              required: true,
              id: "pkgJson",
              name: "pkgJson",
              value: pkgJsonData,
            }}
            height="50vh"
            value={pkgJsonData}
            path={files[0].name}
            onChange={(v) => v && setPkgJsonData(v)}
            defaultLanguage={"json"}
            defaultValue={files[0].value}
          />
        </AccordionDetails>
      </Accordion>

      {state?.errors ? JSON.stringify(state?.errors) : ""}
    </Stack>
  );
}
