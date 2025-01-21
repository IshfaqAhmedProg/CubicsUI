"use client";
import { Button, Stack } from "@mui/material";
import ComponentDetails from "@/library/ui/Inputs/ComponentsForm/ComponentDetails";
import ComponentScripts from "@/library/ui/Inputs/ComponentsForm/ComponentScripts";
import ComponentActionBar from "@/library/ui/Inputs/ComponentsForm/ComponentActionBar";
import { useComponentForm } from "../create/providers";
import ComponentFormHiddenInputs from "@/library/ui/Inputs/ComponentsForm/ComponentFormHiddenInputs";
import DeleteComponentButton from "./delete";

export default function ComponentForm() {
  const { formAction, formPending } = useComponentForm();

  return (
    <Stack
      component={"form"}
      action={formAction}
      position={"relative"}
      height={"100%"}
    >
      <ComponentActionBar
        actions={
          <Button
            disabled={formPending}
            type="submit"
          >
            Save
          </Button>
        }
      />
      <Stack
        height={"100%"}
        overflow={"hidden auto"}
        gap={3}
        mt={15}
      >
        <ComponentFormHiddenInputs />
        <ComponentDetails />
        <ComponentScripts />
        <DeleteComponentButton />
      </Stack>
    </Stack>
  );
}
