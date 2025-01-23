"use client";
import { Button, Stack } from "@mui/material";
import ComponentDetails from "@/library/ui/Forms/ComponentForm/ComponentDetails";
import ComponentScripts from "@/library/ui/Forms/ComponentForm/ComponentScripts";
import ComponentActionBar from "@/library/ui/Forms/ComponentForm/ComponentActionBar";
import { useComponentForm } from "../create/providers";
import ComponentFormHiddenInputs from "@/library/ui/Forms/ComponentForm/ComponentFormHiddenInputs";
import DeleteComponentButton from "./delete";
import ComponentDependencies from "@/library/ui/Forms/ComponentsForm/ComponentDependencies";

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
        <ComponentDependencies />
        <DeleteComponentButton />
      </Stack>
    </Stack>
  );
}
