"use client";

import useDisclosure from "@/library/hooks/useDisclosure";
import {
    ActionReturnType,
    FormActionReturnType,
} from "@/library/types/ActionReturnTypes";
import { ButtonedDialogProps } from "@/library/types/Dialog";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Tooltip,
    Typography
} from "@mui/material";
import { ComponentProps, ReactNode, useActionState, useEffect } from "react";
import Spinner from "../Navigation/Spinner/Spinner";
import HiddenInput from "./HiddenInput";
import { redirect, RedirectType } from "next/navigation";

interface DeleteWithConfirmationProps extends ButtonedDialogProps {
  itemToDelete: string;
  formDatas: {
    name: string;
    value: ComponentProps<"input">["value"];
  }[];
  /**
   * Make sure to `revalidatePath` if `redirectTo` is not set
   * @param prevState
   * @param formdata
   */
  deleteAction(
    prevState: unknown,
    formdata: FormData
  ): ActionReturnType<FormActionReturnType>;
  redirectTo?: string;
  deleteMessage?: ReactNode;
}

export default function DeleteWithConfirmation(
  props: DeleteWithConfirmationProps
) {
  const { open, handleClose, handleOpen } = useDisclosure();
  const {
    deleteAction,
    itemToDelete,
    formDatas,
    deleteMessage,
    redirectTo,
    dialogProps,
    children,
    ...rest
  } = props;
  const [state, action, pending] = useActionState(deleteAction, {});

  useEffect(() => {
    if (state?.status == "success") {
      // Add toast here
      if (redirectTo) redirect(redirectTo, RedirectType.replace);
      // Make sure to revalidate path before closing
      else handleClose();
    }
  }, [state, redirectTo]);

  return (
    <>
      <Tooltip title={`Delete ${itemToDelete}`}>
        <Button
          onClick={handleOpen}
          variant="text"
          color="error"
          {...rest}
        >
          {children ?? `Delete ${itemToDelete}`}
        </Button>
      </Tooltip>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ component: "form", action }}
        {...dialogProps}
      >
        <DialogTitle>Delete {itemToDelete}?</DialogTitle>
        <DialogContent>
          {formDatas.map((fd, i) => (
            <HiddenInput
              key={i}
              name={fd.name}
              value={fd.value}
            />
          ))}
          {state?.status === "error" && (
            <Typography color="error">{state.errors?.formError}</Typography>
          )}
          <Typography
            px={6}
            variant="body2"
          >
            {deleteMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={pending}
            onClick={handleClose}
            variant="contained"
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
