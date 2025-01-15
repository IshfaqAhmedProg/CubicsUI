"use client";
import { Stack } from "@mui/material";
import { useComponentForm } from "./providers";
import Details from "@/library/ui/Inputs/ComponentsForm/ComponentDetails";
import ComponentScripts from "@/library/ui/Inputs/ComponentsForm/ComponentScripts";
import ComponentStatusBar from "@/library/ui/Inputs/ComponentsForm/ComponentStatusBar";
import ComponentFormHiddenInputs from "@/library/ui/Inputs/ComponentsForm/ComponentFormHiddenInputs";

export default function CreateComponentForm() {
  const { formAction } = useComponentForm();
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
