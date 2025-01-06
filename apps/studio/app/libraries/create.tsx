"use client";
import useDisclosure from "@/library/hooks/useDisclosure";
import { AddRounded } from "@mui/icons-material";
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createLibraryAction } from "./actions";
import { FC, ReactElement, useActionState } from "react";
import Link from "next/link";
import { npmPackageNamingLink } from "@/library/constants/externalLinks";
import supportedLangs from "@/library/constants/supportedLangs";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";

export interface CreateLibaryButtonProps extends ButtonProps {
  buttonText?: string;
  dialogProps?: DialogProps;
}

/**
 * Button that when clicked opens a dialog to create a library.
 */
export default function CreateLibraryButton(props: CreateLibaryButtonProps) {
  const { open, handleClose, handleOpen } = useDisclosure();
  const { dialogProps, buttonText, ...rest } = props;
  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={<AddRounded />}
        {...rest}
      >
        {buttonText ?? "Create Library"}
      </Button>
      <CreateLibraryDialog
        handleClose={handleClose}
        {...dialogProps}
        open={open}
      />
    </>
  );
}

/**
 * Dialog to create a library, consists of a form containing inputs for the library name and the language.
 */
export function CreateLibraryDialog({
  handleClose: _handleClose,
  ...rest
}: { handleClose: () => void } & DialogProps) {
  const [state, formAction, pending] = useActionState(createLibraryAction, {});

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
      <DialogTitle>Create Library</DialogTitle>
      <DialogContent>
        <Stack
          px={6}
          gap={6}
        >
          <FormLabel
            htmlFor="name"
            sx={{ maxWidth: "45ch" }}
          >
            Enter the name of the library you want to create, the library name
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
            <FormControl
              hiddenLabel
              required
              disabled={pending}
            >
              <InputLabel id="lang-label">Language</InputLabel>
              <Select
                labelId="lang-label"
                id="lang"
                defaultValue={"Javascript"}
                name="lang"
                label="Language"
              >
                {supportedLangs.map((lang) => {
                  const { name, Logo } = lang;
                  return (
                    <MenuItem
                      value={name}
                      key={name}
                    >
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={2}
                      >
                        <Logo fontSize="small" />
                        <ListItemText primary={name} />
                      </Stack>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Select the language of the package.
              <br />* More coming soon!
            </Typography>
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
