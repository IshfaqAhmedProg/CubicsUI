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
import HiddenInput from "../HiddenInput";
import { components, LocalDependency } from "@cubicsui/db";
import { getProjectComponents } from "./actions";

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
  const [value, setValue] = useState<ComponentLink | null>(null);
  const [inputValue, setInputValue] = useState("");

  const { deps, project, component, setScriptIncludesStyles } =
    useComponentForm();

  const isLinkedCmpStyles = localDep.cmpId === "styles";
  const localDependencies = deps.lcl;

  const [prComponentList, setPrComponentList] = useState<components[]>([]);

  useEffect(() => {
    const subscribe = async () => {
      const prCmpList = await getProjectComponents(project.id, component?.id);
      setPrComponentList(prCmpList);
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
                  can link it to the style script of the component
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
                  variant={isLinkedCmpStyles ? "text" : "contained"}
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
              <Stack>
                {prComponentList.map((prc) => (
                  <Stack
                    key={prc.id}
                    direction={"row"}
                  >
                    <Typography>
                      {prc.name}-{prc.id}
                    </Typography>
                    <Button
                      variant="text"
                      onClick={() => setValue({ id: prc.id, name: prc.name })}
                      startIcon={
                        value?.id == prc.id ? <CheckRounded /> : undefined
                      }
                    >
                      Select
                    </Button>
                  </Stack>
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
          disabled={!value}
          onClick={() => (!!value ? handleConfirm(value) : undefined)}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
