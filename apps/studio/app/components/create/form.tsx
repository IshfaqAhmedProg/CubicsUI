"use client";
import { Button, Paper, Stack, TextField } from "@mui/material";
import { useActionState } from "react";
import { createComponentAction } from "../actions";
import { Library } from "@/library/types/Library";

export default function CreateComponentForm({ library }: { library: Library }) {
  const [state, formAction, pending] = useActionState(
    createComponentAction,
    {}
  );

  console.log("lib", library);
  return (
    <Stack component={Paper}>
      <Stack
        component={"form"}
        action={formAction}
      >
        <TextField name="name" />
        <TextField name="outPath" />
        <TextField
          name="desc"
          multiline
          minRows={2}
        />

        <Button type="submit">Confirm</Button>
      </Stack>
    </Stack>
  );
}
