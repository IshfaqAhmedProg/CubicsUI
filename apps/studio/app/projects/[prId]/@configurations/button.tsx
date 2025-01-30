"use client";

import useDisclosure from "@/library/hooks/useDisclosure";
import { ButtonedDialogProps } from "@/library/types/Dialog";
import { Suggestion } from "@/library/types/Suggestions";
import { configurations } from "@cubicsui/db";
import { Button, ButtonGroup } from "@mui/material";
import { ConfigurationDialog } from "./dialog";
import { CloseRounded } from "@mui/icons-material";
import DeleteWithConfirmation from "@/library/ui/Inputs/DeleteWithConfirmation";
import { deleteConfigurations } from "./actions";

interface ConfigurationButtonProps extends ButtonedDialogProps {
  configuration?: configurations;
  suggestion?: Suggestion;
}

/**
 * Button which opens a dialog for a configuration.
 */
export default function ConfigurationButton(props: ConfigurationButtonProps) {
  const { open, handleClose, handleStrictClose, handleOpen } = useDisclosure();
  const { dialogProps, children, configuration, suggestion, ...buttonProps } =
    props;
  return (
    <>
      <ButtonGroup>
        <Button
          onClick={handleOpen}
          {...buttonProps}
          size="small"
        >
          {children ?? "Add Config"}
        </Button>
        {configuration && (
          <DeleteWithConfirmation
            itemToDelete={configuration.name}
            formDatas={[{ name: "cfgId", value: configuration.id }]}
            deleteAction={deleteConfigurations}
            color="primary"
            deleteMessage={
              "Are you sure you want to delete this configuration?"
            }
          >
            <CloseRounded />
          </DeleteWithConfirmation>
        )}
      </ButtonGroup>
      {open && (
        <ConfigurationDialog
          suggestion={suggestion}
          configuration={configuration}
          handleClose={handleClose}
          handleStrictClose={handleStrictClose}
          {...dialogProps}
          open={open}
        />
      )}
    </>
  );
}
