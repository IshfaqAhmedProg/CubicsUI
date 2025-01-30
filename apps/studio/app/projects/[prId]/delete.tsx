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
import { useProject } from "../../../library/contexts/ProjectContext";
import { redirect, RedirectType } from "next/navigation";
import { deleteProjectAction } from "../actions";

export default function DeleteProjectButton(props: ButtonedDialogProps) {
  const { open, handleClose, handleOpen } = useDisclosure();
  const { dialogProps, children, ...rest } = props;
  const [state, action, pending] = useActionState(deleteProjectAction, {});
  const { project } = useProject();

  useEffect(() => {
    if (state?.status == "success") {
      redirect("/projects", RedirectType.replace);
    }
  }, [state]);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="text"
        color="error"
        {...rest}
      >
        {children ?? `Delete ${project.name}`}
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ component: "form", action }}
        {...dialogProps}
      >
        <DialogTitle>Delete Project?</DialogTitle>
        <DialogContent>
          <HiddenInput
            name="prId"
            value={project.id}
          />
          {state?.status === "error" && (
            <Typography color="error">{state.errors?.formError}</Typography>
          )}
          <Typography
            variant="body2"
            px={6}
          >
            Are you sure you want to delete
            <Typography
              component={"span"}
              fontWeight={"bold"}
            >
              &nbsp;&quot;{project.name}&quot;
            </Typography>{" "}
            and all its configurations and components, this action is
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
