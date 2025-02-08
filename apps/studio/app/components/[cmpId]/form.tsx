"use client";
import { Button, Stack } from "@mui/material";
import ComponentDetails from "@/library/ui/Forms/ComponentForm/ComponentDetails";
import ComponentScripts from "@/library/ui/Forms/ComponentForm/ComponentScripts";
import ComponentActionBar from "@/library/ui/Forms/ComponentForm/ComponentActionBar";
import { useComponentForm } from "@/library/contexts/ComponentFormContext";
import ComponentFormHiddenInputs from "@/library/ui/Forms/ComponentForm/ComponentFormHiddenInputs";
import ComponentDependencies from "@/library/ui/Forms/ComponentForm/ComponentDependencies/ComponentDependencies";
import DeleteWithConfirmation from "@/library/ui/Inputs/DeleteWithConfirmation";
import { deleteComponent } from "../actions";

export default function ComponentForm() {
  const { formAction, formPending, component } = useComponentForm();

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
        {component && (
          <DeleteWithConfirmation
            itemToDelete={component.name}
            formDatas={[{ name: "cmpId", value: component.id }]}
            deleteAction={deleteComponent}
            deleteMessage={`Are you sure you want to delete "${component.name}" and all its scripts? 
            This action is irreversible.`}
            redirectTo={`/libraries/${component.libId}`}
          />
        )}
      </Stack>
    </Stack>
  );
}
