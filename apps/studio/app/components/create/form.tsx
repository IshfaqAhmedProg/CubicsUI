"use client";
import { Button, Stack } from "@mui/material";
import { useActionState } from "react";
import { createComponentAction } from "../actions";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import { useComponentForm } from "./providers";
import Details from "@/library/ui/Inputs/ComponentsForm/Details";
import Scripts from "@/library/ui/Inputs/ComponentsForm/Scripts";

export default function CreateComponentForm() {
  const [state, formAction, pending] = useActionState(
    createComponentAction,
    {}
  );
  const { project, codeblocks, component } = useComponentForm();
  return (
    <Stack
      component={"form"}
      action={formAction}
      gap={3}
    >
      {codeblocks && (
        <HiddenInput
          value={codeblocks.id}
          name="cbId"
        />
      )}
      {component && (
        <HiddenInput
          value={component.id}
          name="cmpId"
        />
      )}
      <HiddenInput
        value={project.id}
        name="prId"
      />
      <Details />
      <Scripts />
      <Button
        disabled={pending}
        type="submit"
      >
        Confirm
      </Button>
    </Stack>
  );
}
