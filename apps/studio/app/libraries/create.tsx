"use client";
import useDisclosure from "@/library/hooks/useDisclosure";
import { AddRounded } from "@mui/icons-material";
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent, DialogProps,
  DialogTitle,
  Stack,
  TextField
} from "@mui/material";
import { createLibraryAction } from "./actions";
import { useActionState } from "react";

export interface CreateLibaryButtonProps extends ButtonProps {
  dialogProps?: DialogProps;
}

export default function CreateLibraryButton(props: CreateLibaryButtonProps) {
  const { open, handleClose, handleOpen } = useDisclosure();
  const { dialogProps, ...rest } = props;
  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={<AddRounded />}
        {...rest}
      >
        Create Library
      </Button>
      <CreateLibraryDialog
        handleClose={handleClose}
        {...dialogProps}
        open={open}
      />
    </>
  );
}
const initialState = {
  errors: {},
};
export function CreateLibraryDialog(
  props: { handleClose: () => void } & DialogProps
) {
  const { handleClose: _handleClose, ...rest } = props;

  const [state, formAction, pending] = useActionState(
    createLibraryAction,
    initialState
  );

  function handleClose(event: {}, reason: "backdropClick" | "escapeKeyDown") {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    _handleClose();
  }

  return (
    <Dialog
      onClose={handleClose}
      {...rest}
      PaperProps={{ component: "form", action: formAction }}
    >
      <DialogTitle>Create Library</DialogTitle>
      <DialogContent>
        <Stack>
          <TextField
            label="Library Name"
            required
            id="name"
            name="name"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={_handleClose}
          color="error"
          variant="text"
        >
          Cancel
        </Button>
        <Button type="submit">Proceed</Button>
      </DialogActions>
    </Dialog>
  );
}
