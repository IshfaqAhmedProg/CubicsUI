"use client";

import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import { Stack, TextField, Button } from "@mui/material";
import { useLibrary } from "@/library/contexts/LibraryContext";
import { useActionState } from "react";
import { updateLibraryAction } from "../../actions";
import LibraryLanguageInput from "@/library/ui/Forms/LibraryForm/LibraryLanguageInput";
import LibraryStyleExtInput from "@/library/ui/Forms/LibraryForm/LibraryStyleExtInput";

export default function LibraryDetailsPage() {
  const { library } = useLibrary();
  const [state, formAction, pending] = useActionState(updateLibraryAction, {});

  // TODO add toast notification
  console.log(state?.status);

  return (
    <Stack
      component={"form"}
      action={formAction}
      gap={3}
    >
      <HiddenInput
        name="libId"
        value={library.id}
      />
      <TextField
        defaultValue={library.name}
        label={"Library Name"}
        name="name"
        disabled={pending}
      />
      <Stack
        direction={"row"}
        gap={3}
      >
        <LibraryLanguageInput
          library={library}
          hiddenLabel
          required
          disabled={pending}
          fullWidth
        />
        <LibraryStyleExtInput
          library={library}
          hiddenLabel
          required
          disabled={pending}
          fullWidth
        />
      </Stack>
      <TextField
        label="Description"
        placeholder="Enter a brief description describing the library"
        defaultValue={library.desc}
        name="desc"
        multiline
        minRows={2}
        disabled={pending}
      />
      <Button
        type="submit"
        disabled={pending}
        endIcon={pending ? <Spinner /> : undefined}
        variant="text"
      >
        Save
      </Button>
    </Stack>
  );
}
