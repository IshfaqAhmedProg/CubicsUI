"use client";
import useDisclosure from "@/library/hooks/useDisclosure";
import { AddRounded } from "@mui/icons-material";
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
  Typography,
} from "@mui/material";
import { createProjectAction } from "./actions";
import { useActionState } from "react";
import Link from "next/link";
import { npmPackageNamingLink } from "@/library/constants/externalLinks";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import { ButtonedDialogProps } from "@/library/types/Dialog";
import ProjectLanguageInput from "@/library/ui/Inputs/ProjectLanguageInput";
import ProjectStyleEngineInput from "@/library/ui/Inputs/ProjectStyleEngineInput";

/**
 * Button that when clicked opens a dialog to create a project.
 */
export default function CreateProjectButton(props: ButtonedDialogProps) {
  const { open, handleClose, handleOpen } = useDisclosure();
  const { dialogProps, children, ...rest } = props;
  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={<AddRounded />}
        {...rest}
      >
        {children ?? "Create Project"}
      </Button>
      <CreateProjectDialog
        handleClose={handleClose}
        {...dialogProps}
        open={open}
      />
    </>
  );
}

/**
 * Dialog to create a project, consists of a form containing inputs for the project name and the language.
 */
export function CreateProjectDialog({
  handleClose: _handleClose,
  ...rest
}: { handleClose: () => void } & DialogProps) {
  const [state, formAction, pending] = useActionState(createProjectAction, {});

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
      PaperProps={{ component: "form", action: formAction }}
    >
      <DialogTitle>Create Project</DialogTitle>
      <DialogContent>
        <Stack
          px={6}
          gap={6}
        >
          <FormLabel
            htmlFor="name"
            sx={{ maxWidth: "45ch" }}
          >
            Enter the name for your new project, the project name should follow{" "}
            <Link
              href={npmPackageNamingLink}
              target="_blank"
            >
              NPM naming conventions
            </Link>
            .
          </FormLabel>
          <TextField
            disabled={pending}
            label="Project Name"
            error={Boolean(state?.errors?.name)}
            helperText={state?.errors?.name}
            required
            id="name"
            name="name"
          />
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            gap={3}
          >
            <Typography variant="body2">
              Select the language you will be using to define the components.
            </Typography>
            <ProjectLanguageInput
              hiddenLabel
              required
              disabled={pending}
              fullWidth
            />
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            gap={3}
          >
            <Typography variant="body2">
              Select the style engine you will use to style your components.
            </Typography>
            <ProjectStyleEngineInput
              hiddenLabel
              required
              disabled={pending}
              fullWidth
            />
          </Stack>
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
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}
