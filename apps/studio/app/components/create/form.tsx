"use client";
import { Button, Stack } from "@mui/material";
import { useComponentForm } from "@/library/contexts/ComponentFormContext";
import ComponentDetails from "@/library/ui/Forms/ComponentForm/ComponentDetails";
import ComponentScripts from "@/library/ui/Forms/ComponentForm/ComponentScripts";
import ComponentActionBar from "@/library/ui/Forms/ComponentForm/ComponentActionBar";
import { useEffect } from "react";
import { redirect, RedirectType } from "next/navigation";
import ComponentFormHiddenInputs from "@/library/ui/Forms/ComponentForm/ComponentFormHiddenInputs";
import ComponentDependencies from "@/library/ui/Forms/ComponentForm/ComponentDependencies/ComponentDependencies";

export default function CreateComponentForm() {
  const { formState, formAction, formPending } = useComponentForm();
  useEffect(() => {
    if (formState?.status == "success") {
      redirect(`/components/${formState.payload?.id}`, RedirectType.replace);
    }
  }, [formState]);
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
            Create
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
      </Stack>
    </Stack>
  );
}
