import { useComponentForm } from "@/library/contexts/ComponentFormContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  CheckRounded,
  LinkOffRounded,
  LinkRounded,
  SearchRounded,
} from "@mui/icons-material";
import { components, LocalDependency } from "@cubicsui/db";
import { getProjectComponents } from "./actions";
import ComponentCard, {
  ComponentSkeleton,
} from "@/library/ui/Layout/Cards/ComponentCard";
import { ComponentLink } from "./LinkLocalDependencyButton";
import ComponentListCard from "@/library/ui/Layout/Cards/ComponentListCard";

function LinkLocalDependencyToStyles({
  localDep,
  handleConfirm,
}: LinkLocalDependencyProps) {
  const { deps, setScriptIncludesStyles } = useComponentForm();
  const localDependencies = deps.lcl;

  const isLinkedCmpStyles = localDep.cmpId === "styles";

  function handleClick() {
    if (isLinkedCmpStyles) {
      handleConfirm({ name: "", id: "" });
      setScriptIncludesStyles(false);
      return;
    }
    handleConfirm({ name: "Styles", id: "styles" });
    setScriptIncludesStyles(true);
  }

  const ComponentToRender = (
    <Stack
      gap={3}
      justifyContent={"space-between"}
      alignItems={"center"}
      direction={"row"}
    >
      <Typography variant="body2">
        If you are using style module files like *.module.css then you can link
        it to the style definitions of the component
      </Typography>
      <Button
        onClick={handleClick}
        startIcon={isLinkedCmpStyles ? <LinkOffRounded /> : <LinkRounded />}
        variant={isLinkedCmpStyles ? "text" : "outlined"}
        sx={{ minWidth: "max-content" }}
      >
        {isLinkedCmpStyles ? "Unlink Styles" : "Link Styles"}
      </Button>
    </Stack>
  );

  if (
    !localDependencies.some((d) => d.cmpId == "styles") ||
    localDep.cmpId === "styles"
  ) {
    return (
      <>
        {ComponentToRender}
        <Divider flexItem>or</Divider>
      </>
    );
  }

  return <></>;
}

interface LinkLocalDependencyProps {
  handleClose: () => void;
  handleConfirm: (value: ComponentLink) => void;
  localDep: LocalDependency;
}

export default function LinkLocalDependencyDialog({
  handleClose,
  handleConfirm,
  localDep,
  ...rest
}: LinkLocalDependencyProps & DialogProps) {
  const [selectedComponent, setSelectedComponent] = useState<components | null>(
    null
  );
  const { project, component } = useComponentForm();
  return (
    <Dialog
      {...rest}
      fullWidth
    >
      <DialogTitle>Link Local Dependency</DialogTitle>
      <DialogContent>
        <Stack
          gap={3}
          px={4}
        >
          <LinkLocalDependencyToStyles
            handleClose={handleClose}
            handleConfirm={handleConfirm}
            localDep={localDep}
          />
          <Stack gap={2}>
            <Typography variant="body2">
              You can link the local dependency to a component below
            </Typography>
            <ComponentListCard
              project={project}
              componentToExclude={component}
              componentActions={(prc) => (
                <Button
                  onClick={() => setSelectedComponent(prc)}
                  startIcon={
                    selectedComponent?.id == prc.id ? (
                      <CheckRounded />
                    ) : undefined
                  }
                  disabled={
                    selectedComponent?.id == prc.id || localDep.cmpId == prc.id
                  }
                >
                  {selectedComponent?.id == prc.id || localDep.cmpId == prc.id
                    ? "Selected"
                    : "Select"}
                </Button>
              )}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          disabled={!selectedComponent}
          onClick={() =>
            !!selectedComponent ? handleConfirm(selectedComponent) : undefined
          }
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
