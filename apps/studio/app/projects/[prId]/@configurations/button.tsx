"use client";

import useDisclosure from "@/library/hooks/useDisclosure";
import { ButtonedDialogProps } from "@/library/types/Dialog";
import { Suggestion } from "@/library/types/Suggestions";
import { configurations } from "@cubicsui/db";
import { Button } from "@mui/material";
import { ConfigurationDialog } from "./dialog";

interface ConfigurationButtonProps extends ButtonedDialogProps {
  configuration?: configurations;
  suggestion?: Suggestion;
}

/**
 * Button which opens a dialog for a configuration.
 */
export default function ConfigurationButton(props: ConfigurationButtonProps) {
  const { open, handleClose, handleStrictClose, handleOpen } = useDisclosure();
  const { dialogProps, children, configuration, suggestion, ...rest } = props;
  return (
    <>
      <Button
        onClick={handleOpen}
        {...rest}
      >
        {children ?? "Add Config"}
      </Button>
      <ConfigurationDialog
        suggestion={suggestion}
        configuration={configuration}
        handleClose={handleClose}
        handleStrictClose={handleStrictClose}
        {...dialogProps}
        open={open}
      />
    </>
  );
}
