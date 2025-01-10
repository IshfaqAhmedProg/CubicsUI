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
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState, useEffect } from "react";
import { createConfigsAction } from "./actions";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import CodeEditor from "@/library/ui/Inputs/CodeEditor";
import { knownConfigurations, SuggestedConfigs } from "./suggestions";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import { Suggestion } from "@/library/types/Suggestions";
import {
  AddRounded,
  DeleteRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";
import { useLibrary } from "./providers";

/**
 * Button which opens a dialog to create a `configuration`.
 */
export default function ConfigurationButton(
  props: ButtonedDialogProps & {
    suggestion?: Suggestion;
  }
) {
  const { open, handleClose, handleOpen } = useDisclosure();
  const { dialogProps, children, suggestion, ...rest } = props;
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
        handleClose={handleClose}
        {...dialogProps}
        open={open}
      />
    </>
  );
}

/**
 * Dialog to create a configuration, consists of a form containing inputs for the configuration name and data.
 */
export function ConfigurationDialog(
  props: {
    handleClose: () => void;
    suggestion?: Suggestion;
  } & DialogProps
) {
  const { handleClose: _handleClose, suggestion, ...rest } = props;
  const [state, formAction, pending] = useActionState(createConfigsAction, {});
  const { library } = useLibrary();

  /**
   * Hijacking the handleClose function to prevent the dialog from closing when the user clicks outside the dialog or presses the escape key.
   */
  function handleClose(event: {}, reason: "backdropClick" | "escapeKeyDown") {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    _handleClose();
  }
  console.log("Current form state:", state);

  useEffect(() => {
    if (state?.status == "success") {
      _handleClose();
    }
  }, [state]);
  return (
    <Dialog
      onClose={handleClose}
      {...rest}
      PaperProps={{ component: "form", action: formAction }}
      fullWidth
    >
      <DialogTitle>
        Add {suggestion ? suggestion.itemName : "Configuration"}
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
          {suggestion ? (
            <HiddenInput
              name="name"
              value={suggestion.itemName}
            />
          ) : (
            <TextField
              id="name"
              name="name"
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
              suggestion?.sample ?? "Enter your configuration details here"
            }
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={pending}
          onClick={_handleClose}
          variant="text"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={pending}
          endIcon={pending ? <Spinner /> : undefined}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/**
 * Accordion container for configurations of a library
 */
export function LibraryConfigurations() {
  const { library, configurations } = useLibrary();

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
                <Button
                  key={c.id}
                  variant="outlined"
                  startIcon={
                    Object.values(knownConfigurations).find(
                      (kc) => kc.itemName == c.name
                    )?.icon
                  }
                >
                  {c.name}
                </Button>
              );
            })}
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
