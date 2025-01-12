"use client";
import { Button, Paper, Stack, TextField } from "@mui/material";
import { useActionState, useState } from "react";
import { createComponentAction } from "../actions";
import { Project } from "@/library/types/Library";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import CodeEditor from "@/library/ui/Inputs/CodeEditor";

export default function CreateComponentForm({ project }: { project: Project }) {
  const [state, formAction, pending] = useActionState(
    createComponentAction,
    {}
  );
  const [code, setCode] = useState<string | undefined>();

  // console.log("lib", library);
  console.log("code", code);
  return (
    <Stack
      component={Paper}
      padding={3}
    >
      <Stack
        component={"form"}
        action={formAction}
        gap={3}
      >
        <HiddenInput
          value={project.id}
          name="prId"
        />
        <Stack
          gap={3}
          direction={"row"}
        >
          <TextField
            label="Component Name"
            name="name"
            fullWidth
          />
          <TextField
            label="Output Path"
            name="outPath"
            fullWidth
          />
        </Stack>
        <TextField
          label="Component Description"
          name="desc"
          multiline
          minRows={2}
        />
        <CodeEditor
          name="code"
          editorData={code}
          path="file.tsx"
          setEditorData={(v) => setCode(v)}
          language={project.lang.toLowerCase()}
        />
        <Button
          disabled={pending}
          type="submit"
        >
          Confirm
        </Button>
      </Stack>
    </Stack>
  );
}
