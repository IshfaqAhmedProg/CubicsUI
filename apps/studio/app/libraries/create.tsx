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
import { createLibraryAction } from "./actions";
import { useActionState, useEffect } from "react";
import Link from "next/link";
import { npmPackageNamingLink } from "@/library/constants/externalLinks";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import { ButtonedDialogProps } from "@/library/types/Dialog";
import LibraryLanguageInput from "@/library/ui/Forms/LibraryForm/LibraryLanguageInput";
import LibraryStyleExtInput from "@/library/ui/Forms/LibraryForm/LibraryStyleExtInput";
import { redirect, RedirectType } from "next/navigation";

/**
 * Button that when clicked opens a dialog to creates a library.
 */
export default function CreateLibraryButton(props: ButtonedDialogProps) {
  const { open, handleClose, handleStrictClose, handleOpen } = useDisclosure();
  const { dialogProps, children, ...rest } = props;
  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={<AddRounded />}
        {...rest}
      >
        {children ?? "Create Library"}
      </Button>
      <CreateLibraryDialog
        handleClose={handleClose}
        handleStrictClose={handleStrictClose}
        {...dialogProps}
        open={open}
      />
    </>
  );
}

interface CreateLibraryDialogProps extends DialogProps {
  handleClose: ReturnType<typeof useDisclosure>["handleClose"];
  handleStrictClose: ReturnType<typeof useDisclosure>["handleStrictClose"];
}

/**
 * Dialog to create a library, consists of a form containing inputs for the library name and the language.
 */
export function CreateLibraryDialog({
  handleClose,
  handleStrictClose,
  ...rest
}: CreateLibraryDialogProps) {
  const [state, formAction, pending] = useActionState(createLibraryAction, {});

  useEffect(() => {
    if (state?.status == "success" && state.payload?.id) {
      redirect(`/libraries/${state.payload.id}`, RedirectType.push);
    }
  }, [state]);
  return (
    <Dialog
      onClose={handleStrictClose}
      {...rest}
      PaperProps={{ component: "form", action: formAction }}
    >
      <DialogTitle>Create Library</DialogTitle>
      <DialogContent>
        <Stack
          px={6}
          gap={6}
        >
          <FormLabel htmlFor="name">
            Enter the name for your new component library, the library name
            should follow{" "}
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
            label="Library Name"
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
            <LibraryLanguageInput
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
              Select the style extension that will be used in the style files of
              the library.
            </Typography>
            <LibraryStyleExtInput
              hiddenLabel
              required
              disabled={pending}
              fullWidth
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        {state?.status == "error" && (
          <Typography color="error">An error has occured</Typography>
        )}
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
