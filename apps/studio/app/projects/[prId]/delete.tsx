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
import { useActionState } from "react";
import { deleteProjectAction } from "./actions";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import { useProject } from "./providers";

export default function DeleteProjectButton(props: ButtonedDialogProps) {
  const { open, handleClose, handleOpen } = useDisclosure();
  const { dialogProps, children, ...rest } = props;
  const [state, action, pending] = useActionState(deleteProjectAction, {});
  const { project } = useProject();

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="text"
        color="error"
        {...rest}
      >
        Delete {project.name}
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ component: "form", action }}
      >
        <DialogTitle>
          Delete <span className="error">{project.name}</span> ?
        </DialogTitle>
        <DialogContent>
          <HiddenInput
            name="prId"
            value={project.id}
          />
          <Typography
            variant="body2"
            px={6}
          >
            Are you sure you want to delete {project.name} and all the
            configurations and components, this action is irreversible.
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
