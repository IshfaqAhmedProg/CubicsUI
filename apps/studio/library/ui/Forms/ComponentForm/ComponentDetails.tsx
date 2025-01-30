"use client";

import { ExpandMoreRounded } from "@mui/icons-material";
import { FormLabel, Stack, TextField, Typography } from "@mui/material";
import CollapsibleSection from "../../Layout/CollapsibleSection";
import ComponentTagsInput from "./ComponentTagsInput";
import { useComponentForm } from "@/library/contexts/ComponentFormContext";

export default function ComponentDetails() {
  const { name, setName, deps, outPath, setOutPath, formState, formPending } =
    useComponentForm();
  console.log(deps);
  return (
    <CollapsibleSection
      title="Details"
      defaultExpanded
      expandIcon={<ExpandMoreRounded />}
    >
      <Stack gap={3}>
        <FormLabel htmlFor="name">
          This is the name you will be using in the CubicsUI CLI to create the
          component in whichever project you want to use it.
          <br />
          <Typography
            variant="body2"
            color="text.primary"
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            maxWidth={"45ch"}
          >
            Note* create using &nbsp;&nbsp;
            <code>{`npx cui create ${name !== "" ? name : "<name>"}`}</code>
          </Typography>
        </FormLabel>
        <TextField
          label="Component Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={Boolean(formState?.errors?.name)}
          helperText={formState?.errors?.name}
          name="name"
          fullWidth
          disabled={formPending}
        />

        <FormLabel htmlFor="outPath">
          Path of the component relative to the current working directory, this
          tells CubicsUI CLI where to output your component
        </FormLabel>
        <TextField
          label="Output Path"
          value={outPath}
          onChange={(e) => setOutPath(e.target.value)}
          error={Boolean(formState?.errors?.outPath)}
          helperText={formState?.errors?.outPath}
          name="outPath"
          fullWidth
          disabled={formPending}
        />
        <TextField
          label="Component Description"
          name="desc"
          multiline
          minRows={2}
          fullWidth
          disabled={formPending}
        />
        <ComponentTagsInput />
      </Stack>
    </CollapsibleSection>
  );
}
