"use client";

import useDisclosure from "@/library/hooks/useDisclosure";
import { ButtonedDialogProps } from "@/library/types/Dialog";
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
  Tooltip,
  Typography,
} from "@mui/material";
import { useActionState, useEffect } from "react";
import { createConfigsAction } from "./actions";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import CodeEditor from "@/library/ui/Inputs/CodeEditor";
import { LibraryWithConfigurations } from "@/library/types/Library";
import { configurationSuggestions } from "./suggestions";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import { Suggestion } from "@/library/types/Suggestions";

/**
 * Component that renders the suggested configurations that a user might need
 */
export function SuggestedConfigs({
  library,
}: {
  library: LibraryWithConfigurations;
}) {
  return (
    <Stack
      id={"configurations-suggestions"}
      direction={"row"}
      alignItems={"center"}
      gap={2}
    >
      <Typography
        variant="body2"
        color="textSecondary"
      >
        Suggested
      </Typography>
      {configurationSuggestions(library).map((sug) => (
        <AddConfigButton
          key={sug.title}
          library={library}
          variant="outlined"
          startIcon={sug.icon}
          name={sug.itemName}
          suggestion={sug}
          title={sug.desc}
        >
          {sug.title}
        </AddConfigButton>
      ))}
    </Stack>
  );
}

/**
 * Button which opens a dialog to create a `configuration`.
 */
export default function AddConfigButton(
  props: ButtonedDialogProps & {
    suggestion?: Suggestion;
    library: LibraryWithConfigurations;
  }
) {
  const { open, handleClose, handleOpen } = useDisclosure();
  const { dialogProps, children, library, suggestion, ...rest } = props;
  return (
    <>
      <Button
        onClick={handleOpen}
        {...rest}
      >
        {children ?? "Add Config"}
      </Button>
      <CreateConfigDialog
        library={library}
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
export function CreateConfigDialog(
  props: {
    handleClose: () => void;
    library: LibraryWithConfigurations;
    suggestion?: Suggestion;
  } & DialogProps
) {
  const { handleClose: _handleClose, library, suggestion, ...rest } = props;
  const [state, formAction, pending] = useActionState(createConfigsAction, {});

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
        Create {suggestion ? suggestion.itemName : "Configuration"}
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
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
