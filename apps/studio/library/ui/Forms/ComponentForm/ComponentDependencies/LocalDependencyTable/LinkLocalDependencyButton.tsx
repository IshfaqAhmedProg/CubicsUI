import { useComponentForm } from "@/app/components/create/providers";
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
import useDisclosure from "@/library/hooks/useDisclosure";
import {
  CheckRounded,
  LinkOffRounded,
  LinkRounded,
  SearchRounded,
} from "@mui/icons-material";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import { components, LocalDependency } from "@cubicsui/db";
import { getProjectComponents } from "./actions";
import ComponentCard, {
  ComponentSkeleton,
} from "@/library/ui/Layout/Cards/ComponentCard";

interface ComponentLink {
  name: string;
  id: string;
}

export default function LinkLocalDependencyButton({
  index,
}: {
  index: number;
}) {
  const { open, handleOpen, handleClose } = useDisclosure();
  const { deps, setDeps, formPending } = useComponentForm();
  const localDep = deps.lcl[index];

  function handleConfirm(value: ComponentLink) {
    setDeps((prev) => {
      let lcl = [...prev.lcl];
      lcl[index].cmpId = value.id;
      return { ...prev, lcl };
    });
    handleClose();
  }

  return (
    <>
      <HiddenInput
        value={localDep.cmpId}
        name="depsLclCmpId"
      />
      <Button
        variant={localDep.cmpId ? "text" : "contained"}
        sx={{ minWidth: "max-content" }}
        onClick={handleOpen}
        startIcon={localDep.cmpId ? <CheckRounded /> : <LinkRounded />}
        disabled={formPending}
      >
        {localDep.cmpId ? "Linked" : "Link"}
      </Button>
      {open && (
        <LinkLocalDependencyDialog
          open={open}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
          localDep={localDep}
        />
      )}
    </>
  );
}

function LinkLocalDependencyDialog({
  handleClose,
  handleConfirm,
  localDep,
  ...rest
}: {
  handleClose: () => void;
  handleConfirm: (value: ComponentLink) => void;
  localDep: LocalDependency;
} & DialogProps) {
  const [selectedComponent, setSelectedComponent] = useState<components | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const { deps, project, component, setScriptIncludesStyles } =
    useComponentForm();

  const localDependencies = deps.lcl;

  const [prComponentList, setPrComponentList] = useState<components[]>([]);

  const isLinkedCmpStyles = localDep.cmpId === "styles";

  useEffect(() => {
    const subscribe = async () => {
      setLoading(true);
      const prCmpList = await getProjectComponents(project.id, component?.id);
      setPrComponentList(prCmpList);
      setLoading(false);
    };
    subscribe();
  }, [project, component]);

  return (
    <Dialog {...rest}>
      <DialogTitle>Link Local Dependency</DialogTitle>
      <DialogContent>
        <Stack
          gap={3}
          px={4}
        >
          {(!localDependencies.some((d) => d.cmpId == "styles") ||
            localDep.cmpId === "styles") && (
            <>
              <Stack
                gap={3}
                justifyContent={"space-between"}
                alignItems={"center"}
                direction={"row"}
              >
                <Typography variant="body2">
                  If you are using style module files like *.module.css then you
                  can link it to the style definitions of the component
                </Typography>
                <Button
                  onClick={() => {
                    if (isLinkedCmpStyles) {
                      handleConfirm({ name: "", id: "" });
                      setScriptIncludesStyles(false);
                      return;
                    }
                    handleConfirm({ name: "Styles", id: "styles" });
                    setScriptIncludesStyles(true);
                  }}
                  startIcon={
                    isLinkedCmpStyles ? <LinkOffRounded /> : <LinkRounded />
                  }
                  variant={isLinkedCmpStyles ? "text" : "outlined"}
                  sx={{ minWidth: "max-content" }}
                >
                  {isLinkedCmpStyles ? "Unlink Styles" : "Link Styles"}
                </Button>
              </Stack>
              <Divider flexItem>or</Divider>
            </>
          )}
          <Stack gap={2}>
            <Typography variant="body2">
              You can link the local dependency to a component below
            </Typography>
            <Stack
              pt={2}
              px={2}
              component={Paper}
              gap={3}
              minWidth={"22rem"}
            >
              <TextField
                label={"Search for your component"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: <SearchRounded color="disabled" />,
                  },
                }}
              />
              <Stack
                gap={2}
                height={"12rem"}
                overflow={"hidden auto"}
              >
                {loading &&
                  [...Array(3)].map((_, i) => <ComponentSkeleton key={i} />)}
                {prComponentList.map((prc) => (
                  <ComponentCard
                    key={prc.id}
                    component={prc}
                    action={
                      <Button
                        onClick={() => setSelectedComponent(prc)}
                        startIcon={
                          selectedComponent?.id == prc.id ? (
                            <CheckRounded />
                          ) : undefined
                        }
                        disabled={selectedComponent?.id == prc.id}
                      >
                        {selectedComponent?.id == prc.id
                          ? "Selected"
                          : "Select"}
                      </Button>
                    }
                  />
                ))}
              </Stack>
            </Stack>
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
