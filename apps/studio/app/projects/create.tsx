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
  const { open, handleClose, handleStrictClose, handleOpen } = useDisclosure();
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
        handleStrictClose={handleStrictClose}
        {...dialogProps}
        open={open}
      />
    </>
  );
}

interface CreateProjectDialogProps extends DialogProps {
  handleClose: ReturnType<typeof useDisclosure>["handleClose"];
  handleStrictClose: ReturnType<typeof useDisclosure>["handleStrictClose"];
}

/**
 * Dialog to create a project, consists of a form containing inputs for the project name and the language.
 */
export function CreateProjectDialog({
  handleClose,
  handleStrictClose,
  ...rest
}: CreateProjectDialogProps) {
  const [state, formAction, pending] = useActionState(createProjectAction, {});

  return (
    <Dialog
      onClose={handleStrictClose}
      {...rest}
      PaperProps={{ component: "form", action: formAction }}
    >
      <DialogTitle>Create Project</DialogTitle>
      <DialogContent>
        <Stack
          px={6}
          gap={6}
        >
          <FormLabel htmlFor="name">
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
          onClick={handleClose}
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
