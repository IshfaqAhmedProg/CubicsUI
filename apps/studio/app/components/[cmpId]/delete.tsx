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
import { deleteComponent } from "../actions";
import { useComponentForm } from "../create/providers";
import { redirect, RedirectType } from "next/navigation";

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

  if (!component) return null;

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="text"
        color="error"
        {...rest}
      >
        Delete {component.name}
      </Button>
      <Dialog
        onClose={handleStrictClose}
        open={open}
        PaperProps={{ component: "form", action }}
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
