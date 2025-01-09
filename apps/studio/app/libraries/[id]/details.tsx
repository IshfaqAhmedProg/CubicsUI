"use client";
import useDisclosure from "@/library/hooks/useDisclosure";
import { ButtonedDialogProps } from "@/library/types/Dialog";
import { LibraryWithConfigurations } from "@/library/types/Library";
import { ExpandMoreRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React, { useActionState } from "react";
import { deleteLibrary } from "./actions";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";

export function DeleteLibraryButton(
  props: ButtonedDialogProps & {
    library: LibraryWithConfigurations;
  }
) {
  const { open, handleClose, handleOpen } = useDisclosure();
  const { library, dialogProps, children, ...rest } = props;
  const [state, action, pending] = useActionState(deleteLibrary, {});

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="text"
        color="error"
        {...rest}
      >
        Delete {library.name}
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ component: "form", action }}
      >
        <DialogTitle>Delete "{library.name}"?</DialogTitle>
        <DialogContent>
          <HiddenInput
            name="libId"
            value={library.id}
          />
          <Typography
            variant="body2"
            px={4}
            color={"textSecondary"}
          >
            Are you sure you want to delete {library.name}, this action is not
            reversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={pending}
            onClick={handleClose}
            variant="text"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={pending}
            endIcon={pending ? <Spinner /> : undefined}
            color="error"
            variant="text"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function LibraryDetails({
  library,
}: {
  library: LibraryWithConfigurations;
}) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
        <Typography fontFamily={"var(--font-h)"}>Details</Typography>
      </AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
}
