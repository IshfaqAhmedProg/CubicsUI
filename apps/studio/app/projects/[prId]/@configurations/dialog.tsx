"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useActionState, useEffect } from "react";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import CodeEditor from "@/library/ui/Inputs/CodeEditor";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import { Suggestion } from "@/library/types/Suggestions";
import { configurations } from "@cubicsui/db";
import { useProject } from "../../../../library/contexts/ProjectContext";
import { saveConfigAction } from "./actions";
import useDisclosure from "@/library/hooks/useDisclosure";

export interface ConfigurationDialogProps extends DialogProps {
  handleClose: ReturnType<typeof useDisclosure>["handleClose"];
  handleStrictClose: ReturnType<typeof useDisclosure>["handleStrictClose"];
  configuration?: configurations;
  suggestion?: Suggestion;
}

/**
 * Dialog to create a configuration, consists of a form containing inputs for the configuration name and data.
 */
export function ConfigurationDialog(props: ConfigurationDialogProps) {
  const { handleClose, handleStrictClose, suggestion, configuration, ...rest } =
    props;
  const [state, formAction, pending] = useActionState(saveConfigAction, {});
  const { project } = useProject();

  useEffect(() => {
    if (state?.status === "success") {
      // TODO add toast notification
      handleClose();
    }
  }, [state]);

  return (
    <Dialog
      onClose={handleStrictClose}
      {...rest}
      PaperProps={{
        component: "form",
        action: formAction,
      }}
      fullWidth
    >
      <DialogTitle>
        {configuration ? "Edit" : "Add"}{" "}
        {suggestion ? suggestion.itemName : "Configuration"}
      </DialogTitle>
      <DialogContent>
        <Stack
          px={6}
          gap={6}
          mt={3}
        >
          <HiddenInput
            name="prId"
            value={project.id}
          />
          {configuration?.id && (
            <HiddenInput
              name="configId"
              value={configuration.id}
            />
          )}
          {suggestion ? (
            <HiddenInput
              name="name"
              value={suggestion.itemName}
            />
          ) : (
            <TextField
              id="name"
              name="name"
              defaultValue={configuration?.name}
              error={Boolean(state?.errors?.name)}
              disabled={pending}
              helperText={state?.errors?.name}
              placeholder="tailwind.config.js"
              label={"Configuration Name"}
            />
          )}
          {suggestion && (
            <FormLabel htmlFor="data">{suggestion.desc}</FormLabel>
          )}
          <CodeEditor
            id="data"
            name="data"
            language="json"
            defaultValue={
              configuration?.data ??
              suggestion?.sample ??
              "Enter your configuration details here"
            }
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={pending}
          onClick={handleClose}
          variant="text"
          type="button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={pending}
          endIcon={pending ? <Spinner /> : undefined}
        >
          {configuration ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
