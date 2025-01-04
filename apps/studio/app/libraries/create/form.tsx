"use client";

import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useActionState } from "react";
import { createLibraryAction } from "../actions";

const initialState = {
  errors: {},
};

export default function CreateLibraryForm() {
  const [state, formAction, pending] = useActionState(
    createLibraryAction,
    initialState
  );
  return (
    <Box
      component={"form"}
      action={formAction}
    >
      <TextField
        required
        id="name"
        name="name"
        placeholder="Library Name"
      />
      <TextField
        required
        multiline
        maxRows={5}
        id="pkgJson"
        name="pkgJson"
        placeholder="Enter your package.json data here"
      />

      {state?.errors ? JSON.stringify(state?.errors) : ""}

      <Button
        type="submit"
        disabled={pending}
        endIcon={pending ? <CircularProgress /> : undefined}
      >
        Confirm
      </Button>
    </Box>
  );
}
