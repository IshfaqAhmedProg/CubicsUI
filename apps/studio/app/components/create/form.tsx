"use client";
import { Button, Paper, Stack, TextField } from "@mui/material";
import { useActionState, useState } from "react";
import { createComponentAction } from "../actions";
import { Library } from "@/library/types/Library";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import CodeEditor from "@/library/ui/Inputs/CodeEditor";

export default function CreateComponentForm({ library }: { library: Library }) {
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
          value={library.id}
          name="libId"
        />
        <TextField
          label="Component Name"
          name="name"
        />
        <TextField
          label="Output Path"
          name="outPath"
        />
        <TextField
          label="Component Description"
          name="desc"
          multiline
          minRows={2}
        />
        <CodeEditor
          name="code"
          editorData={code}
          path=""
          setEditorData={(v) => setCode(v)}
          language={library.lang.toLowerCase()}
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
