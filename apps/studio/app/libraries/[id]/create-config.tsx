import useDisclosure from "@/library/hooks/useDisclosure";
import { ButtonedDialogProps } from "@/library/types/Dialog";
import { Button, Dialog, DialogActions, DialogProps } from "@mui/material";
import { useActionState } from "react";
import { createConfigsAction } from "./actions";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";

/**
 * Button that when clicked opens a dialog to create a `configuration`.
 */
export default function AddConfigButton(props: ButtonedDialogProps) {
  const { open, handleClose, handleOpen } = useDisclosure();
  const { dialogProps, buttonText, ...rest } = props;
  return (
    <>
      <Button
        onClick={handleOpen}
        {...rest}
      >
        {buttonText ?? "Add Config"}
      </Button>
      <CreateConfigDialog
        handleClose={handleClose}
        {...dialogProps}
        open={open}
      />
    </>
  );
}

/**
 * Dialog to create a configuration, consists of a form containing inputs for the configuration name and data.
 */
export function CreateConfigDialog({
  handleClose: _handleClose,
  ...rest
}: { handleClose: () => void } & DialogProps) {
  const [state, formAction, pending] = useActionState(createConfigsAction, {});

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
      Create Config
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
