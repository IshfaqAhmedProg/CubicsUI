"use client";
import useDisclosure from "@/library/hooks/useDisclosure";
import { ButtonedDialogProps } from "@/library/types/Dialog";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useActionState, useEffect } from "react";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import { redirect, RedirectType } from "next/navigation";
import { deleteComponent } from "@/app/components/actions";
import { useComponentForm } from "@/library/contexts/ComponentFormContext";

export default function DeleteComponentButton(props: ButtonedDialogProps) {
  const { open, handleStrictClose, handleClose, handleOpen } = useDisclosure();
  const { dialogProps, children, ...rest } = props;
  const [state, action, pending] = useActionState(deleteComponent, {});
  const { component } = useComponentForm();

  useEffect(() => {
    if (state?.status == "success") {
      redirect(`/projects/${state.payload?.prId}`, RedirectType.replace);
    }
  }, [state]);

  if (!component) {
    throw new Error("Component from useComponentForm() not found!");
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="text"
        color="error"
        {...rest}
      >
        {children ?? `Delete ${component.name}`}
      </Button>
      <Dialog
        onClose={handleStrictClose}
        open={open}
        PaperProps={{ component: "form", action }}
        {...dialogProps}
      >
        <DialogTitle>
          Delete <span className="error">{component.name}</span> ?
        </DialogTitle>
        <DialogContent>
          <HiddenInput
            name="cmpId"
            value={component.id}
          />
          <Typography
            variant="body2"
            px={6}
          >
            Are you sure you want to delete {component.name}, this action is
            irreversible.
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
