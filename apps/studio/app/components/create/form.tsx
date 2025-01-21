"use client";
import { Button, Stack } from "@mui/material";
import { useComponentForm } from "./providers";
import ComponentDetails from "@/library/ui/Inputs/ComponentsForm/ComponentDetails";
import ComponentScripts from "@/library/ui/Inputs/ComponentsForm/ComponentScripts";
import ComponentActionBar from "@/library/ui/Inputs/ComponentsForm/ComponentActionBar";
import { useEffect } from "react";
import { redirect, RedirectType } from "next/navigation";
import ComponentFormHiddenInputs from "@/library/ui/Inputs/ComponentsForm/ComponentFormHiddenInputs";

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
      </Stack>
    </Stack>
  );
}
