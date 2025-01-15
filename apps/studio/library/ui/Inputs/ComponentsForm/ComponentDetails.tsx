"use client";

import { ExpandMoreRounded } from "@mui/icons-material";
import { Stack, TextField, Typography } from "@mui/material";
import React from "react";
import CollapsibleSection from "../../Layout/CollapsibleSection";
import ComponentTagsInput from "./ComponentTagsInput";
import { useComponentForm } from "@/app/components/create/providers";

export default function Details() {
  const { name, setName, outDir, setOutDir, outFile, setOutFile } =
    useComponentForm();
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
          name="name"
          fullWidth
        />
        <Stack
          direction={"row"}
          gap={1}
          alignItems={"center"}
        >
          <Typography variant="body2">components</Typography>
          <Typography
            variant="body2"
            fontSize={"1.5em"}
          >
            /
          </Typography>
          <TextField
            label="Output Directory"
            value={outDir}
            onChange={(e) => setOutDir(e.target.value)}
            name="outDir"
            fullWidth
          />
          <Typography
            variant="body2"
            fontSize={"1.5em"}
          >
            /
          </Typography>
          <TextField
            label="Output File Name"
            value={outFile}
            onChange={(e) => setOutFile(e.target.value)}
            name="outFile"
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
