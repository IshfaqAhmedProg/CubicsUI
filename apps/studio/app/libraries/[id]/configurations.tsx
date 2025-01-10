"use client";

import useDisclosure from "@/library/hooks/useDisclosure";
import { ButtonedDialogProps } from "@/library/types/Dialog";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState } from "react";
import { configsAction } from "./actions";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import CodeEditor from "@/library/ui/Inputs/CodeEditor";
import { knownConfigurations, SuggestedConfigs } from "./suggestions";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import { Suggestion } from "@/library/types/Suggestions";
import { AddRounded, ExpandMoreRounded } from "@mui/icons-material";
import { useLibrary } from "./providers";
import { configurations } from "@cubicsui/db";

/**
 * Button which opens a dialog to create a `configuration`.
 */
export default function ConfigurationButton(
  props: ButtonedDialogProps & {
    configuration?: configurations;
    suggestion?: Suggestion;
  }
) {
  const { open, handleClose, handleOpen } = useDisclosure();
  const { dialogProps, children, configuration, suggestion, ...rest } = props;
  return (
    <>
      <Button
        onClick={handleOpen}
        {...rest}
      >
        {children ?? "Add Config"}
      </Button>
      <ConfigurationDialog
        suggestion={suggestion}
        configuration={configuration}
        handleClose={handleClose}
        {...dialogProps}
        open={open}
      />
    </>
  );
}

export interface ConfigurationDialogProps extends DialogProps {
  handleClose: () => void;
  configuration?: configurations;
  suggestion?: Suggestion;
}

/**
 * Dialog to create a configuration, consists of a form containing inputs for the configuration name and data.
 */
export function ConfigurationDialog(props: ConfigurationDialogProps) {
  const {
    handleClose: _handleClose,
    suggestion,
    configuration,
    ...rest
  } = props;
  const [state, formAction, pending] = useActionState(configsAction, {});
  const { library } = useLibrary();
  console.log({ formState: state });

  /**
   * Hijacking the handleClose function to prevent the dialog from closing when the user clicks outside the dialog or presses the escape key.
   */
  function handleClose(event: {}, reason: "backdropClick" | "escapeKeyDown") {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    _handleClose();
  }

  return (
    <Dialog
      onClose={handleClose}
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
            name="libId"
            value={library.id}
          />
          {configuration && (
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
        {configuration && (
          <Button
            color="error"
            variant="text"
            type="button"
          >
            Delete
          </Button>
        )}
        <Button
          disabled={pending}
          onClick={_handleClose}
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
          {configuration ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/**
 * Accordion container for configurations of a library
 */
export function LibraryConfigurations() {
  const { configurations } = useLibrary();

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
        <Typography>Configurations</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          id={"configurations-container"}
          gap={2}
        >
          <SuggestedConfigs />

          <Stack
            direction={"row"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            gap={2}
            p={2}
            component={Paper}
          >
            <ConfigurationButton
              variant="text"
              startIcon={<AddRounded />}
            >
              Add New
            </ConfigurationButton>
            {configurations.map((c) => {
              return (
                <ConfigurationButton
                  key={c.id}
                  variant="outlined"
                  configuration={c}
                  startIcon={
                    Object.values(knownConfigurations).find(
                      (kc) => kc.itemName == c.name
                    )?.icon
                  }
                >
                  {c.name}
                </ConfigurationButton>
              );
            })}
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
