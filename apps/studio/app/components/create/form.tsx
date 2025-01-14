"use client";
import { Button, FormLabel, Stack, Switch, TextField } from "@mui/material";
import { useActionState, useState } from "react";
import { createComponentAction } from "../actions";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import CodeEditor, { onMountHandler } from "@/library/ui/Inputs/CodeEditor";
import { useComponentForm } from "./providers";
import CollapsibleSection from "@/library/ui/Layout/CollapsibleSection";
import { ExpandMoreRounded } from "@mui/icons-material";
import DependencyTable from "@/library/ui/Inputs/DependencyTable/DependencyTable";
import isValidFilename from "@/library/functions/isValidFileName";

export default function CreateComponentForm() {
  const [state, formAction, pending] = useActionState(
    createComponentAction,
    {}
  );

  const {
    project,
    name,
    setName,
    outFile,
    setOutFile,
    outDir,
    setOutDir,
    scriptCode,
    setScriptCode,
    styleCode,
    setStyleCode,
    scriptIncludesStyles,
    setScriptIncludesStyles,
    analyseDependencies,
  } = useComponentForm();
  return (
    <Stack
      component={"form"}
      action={formAction}
      gap={3}
    >
      <HiddenInput
        value={project.id}
        name="prId"
      />
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
            gap={3}
          >
            <TextField
              label="Output Directory"
              value={outDir}
              onChange={(e) => setOutDir(e.target.value)}
              name="outPath"
              fullWidth
            />
            <TextField
              label="Output File Name"
              value={outFile}
              error={!isValidFilename(outFile)}
              onChange={(e) => setOutFile(e.target.value)}
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
        </Stack>
      </CollapsibleSection>

      <CollapsibleSection
        title="Scripts"
        expanded
      >
        <Stack gap={3}>
          <FormLabel htmlFor="scriptCode">
            Paste the code that defines your component below,
          </FormLabel>
          <CodeEditor
            id="scriptCode"
            name="scriptCode"
            editorData={scriptCode}
            path={outFile}
            setEditorData={(v) => setScriptCode(v)}
            language={project.lang.toLowerCase()}
            onMount={onMountHandler}
          />
          <CollapsibleSection
            expandIcon={<ExpandMoreRounded />}
            defaultExpanded
            title="Dependencies"
          >
            <Stack gap={3}>
              <Button onClick={analyseDependencies}>
                Analyse Dependencies from script
              </Button>
              <DependencyTable />
            </Stack>
          </CollapsibleSection>
          <Stack
            direction={"row"}
            gap={3}
            alignItems={"center"}
          >
            <FormLabel htmlFor="scriptIncludesStyles">
              Does the component include styles?
            </FormLabel>
            <Switch
              id="scriptIncludesStyles"
              checked={scriptIncludesStyles}
              onChange={() => setScriptIncludesStyles(!scriptIncludesStyles)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Stack>
          <CollapsibleSection
            title="Styles"
            expanded={scriptIncludesStyles}
            disabled={!scriptIncludesStyles}
          >
            {scriptIncludesStyles && (
              <Stack gap={2}>
                <FormLabel>
                  Paste the style definitions for the component defined above,
                </FormLabel>
                <CodeEditor
                  name="styleCode"
                  editorData={styleCode}
                  path={`${name}.module.css`}
                  setEditorData={(v) => setStyleCode(v)}
                  language="css"
                />
              </Stack>
            )}
          </CollapsibleSection>
        </Stack>
      </CollapsibleSection>
      <Button
        disabled={pending}
        type="submit"
      >
        Confirm
      </Button>
    </Stack>
  );
}
