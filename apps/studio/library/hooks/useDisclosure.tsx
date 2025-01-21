import { useState } from "react";

export default function useDisclosure(initialState: boolean = false) {
  const [open, setOpen] = useState(initialState);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  /**
   * Hijacking the handleClose function to prevent the dialog from closing when the user clicks outside the dialog or presses the escape key.
   */
  function handleStrictClose(
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    handleClose();
  }

  function handleToggle() {
    setOpen((prev) => !prev);
  }

  return { open, handleClose, handleStrictClose, handleOpen, handleToggle };
}
