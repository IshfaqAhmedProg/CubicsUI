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
import { deleteLibrary } from "./actions";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import { useLibrary } from "./providers";

export default function DeleteLibraryButton(props: ButtonedDialogProps) {
  const { open, handleClose, handleOpen } = useDisclosure();
  const { dialogProps, children, ...rest } = props;
  const [state, action, pending] = useActionState(deleteLibrary, {});
  const { library } = useLibrary();

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
        <DialogTitle>
          Delete <span className="error">{library.name}</span> ?
        </DialogTitle>
        <DialogContent>
          <HiddenInput
            name="libId"
            value={library.id}
          />
          <Typography
            variant="body2"
            px={6}
            color={"textSecondary"}
          >
            Are you sure you want to delete {library.name} and all the
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
