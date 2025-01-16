"use client";
import { Stack } from "@mui/material";
import { useComponentForm } from "./providers";
import Details from "@/library/ui/Inputs/ComponentsForm/ComponentDetails";
import ComponentScripts from "@/library/ui/Inputs/ComponentsForm/ComponentScripts";
import ComponentStatusBar from "@/library/ui/Inputs/ComponentsForm/ComponentStatusBar";
import ComponentFormHiddenInputs from "@/library/ui/Inputs/ComponentsForm/ComponentFormHiddenInputs";
import { useEffect } from "react";
import { redirect, RedirectType } from "next/navigation";

export default function CreateComponentForm() {
  const { formState, formAction } = useComponentForm();
  useEffect(() => {
    if (formState?.status == "success") {
      redirect(`/components/${formState.payload.id}`, RedirectType.replace);
    }
  }, [formState]);
  return (
    <Stack
      component={"form"}
      action={formAction}
      position={"relative"}
      height={"100%"}
    >
      <ComponentStatusBar />
      <Stack
        height={"100%"}
        overflow={"hidden auto"}
        gap={3}
        mt={15}
      >
        <ComponentFormHiddenInputs />
        <Details />
        <ComponentScripts />
      </Stack>
    </Stack>
  );
}
