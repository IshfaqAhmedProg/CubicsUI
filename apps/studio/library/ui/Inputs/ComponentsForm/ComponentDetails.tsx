"use client";

import { ExpandMoreRounded } from "@mui/icons-material";
import { FormLabel, Stack, TextField } from "@mui/material";
import CollapsibleSection from "../../Layout/CollapsibleSection";
import ComponentTagsInput from "./ComponentTagsInput";
import { useComponentForm } from "@/app/components/create/providers";

export default function Details() {
  const { name, setName, outPath, setOutPath, formState } = useComponentForm();
  return (
    <CollapsibleSection
      title="Details"
      defaultExpanded
      expandIcon={<ExpandMoreRounded />}
    >
      <Stack gap={3}>
        <TextField
          label="Component Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={Boolean(formState?.errors?.name)}
          helperText={formState?.errors?.name}
          name="name"
          fullWidth
        />
        <Stack
          direction={"row"}
          gap={1}
          alignItems={"center"}
        >
          <FormLabel htmlFor="outPath">
            Path of the component relative to the current working directory,
            this tells the CLI where to output your component
          </FormLabel>
          <TextField
            label="Output Path"
            value={outPath}
            onChange={(e) => setOutPath(e.target.value)}
            error={Boolean(formState?.errors?.outPath)}
            helperText={formState?.errors?.outPath}
            name="outPath"
            fullWidth
          />
        </Stack>
        <TextField
          label="Component Description"
          name="desc"
          multiline
          minRows={2}
          fullWidth
        />
        <ComponentTagsInput />
      </Stack>
    </CollapsibleSection>
  );
}
