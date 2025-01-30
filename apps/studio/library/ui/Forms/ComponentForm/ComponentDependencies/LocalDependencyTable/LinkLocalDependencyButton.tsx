import { useComponentForm } from "@/library/contexts/ComponentFormContext";
import {
  Button
} from "@mui/material";
import useDisclosure from "@/library/hooks/useDisclosure";
import {
  CheckRounded, LinkRounded
} from "@mui/icons-material";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import LinkLocalDependencyDialog from "./LinkLocalDependencyDialog";

export interface ComponentLink {
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
