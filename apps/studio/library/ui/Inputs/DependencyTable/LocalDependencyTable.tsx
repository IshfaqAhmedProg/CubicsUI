import { useComponentForm } from "@/app/components/create/providers";
import {
  ArrowBackRounded,
  RemoveCircleOutlineRounded,
  AddRounded,
} from "@mui/icons-material";
import { Stack, Tooltip, IconButton, TextField, Button } from "@mui/material";
import { DependencySectionLayout } from "./DependencyTable";
import { ComponentAutocomplete } from "./ComponentAutocomplete";
import { ExternalDependency } from "@cubicsui/db";
import { createExternalDependency } from "@/library/functions/dependencyAnalyser";

export default function LocalDependencyTable() {
  const { deps, setDeps } = useComponentForm();
  console.log(deps);

  function shiftFromLclToExt(index: number) {
    let lcl = [...deps.lcl],
      ext = [...deps.ext];
    ext.push(createExternalDependency(lcl[index].name));
    lcl.splice(index, 1);
    setDeps({ lcl, ext });
  }

  function addLclDeps() {
    let lcl = [...deps.lcl];
    lcl.push({ name: "", cmpId: "" });
    setDeps({ ...deps, lcl });
  }

  function removeLclDeps(index: number) {
    let lcl = [...deps.lcl];
    lcl.splice(index, 1);
    setDeps({ ...deps, lcl });
  }

  return (
    <DependencySectionLayout title={"Local Dependencies"}>
      {deps.lcl.map((l, i) => {
        return (
          <Stack
            key={l.name}
            direction={"row"}
            gap={1}
          >
            <Stack direction={"row"}>
              <Tooltip title={`Shift "${l.name}" to External Dependencies`}>
                <IconButton onClick={() => shiftFromLclToExt(i)}>
                  <ArrowBackRounded />
                </IconButton>
              </Tooltip>
              <Tooltip title={`Remove "${l.name}"`}>
                <IconButton onClick={() => removeLclDeps(i)}>
                  <RemoveCircleOutlineRounded color="error" />
                </IconButton>
              </Tooltip>
            </Stack>
            <TextField
              label={i == 0 ? "Relative Path" : undefined}
              name="depsLclName"
              value={l.name}
              fullWidth
              onChange={(e) => {
                let lclDeps = [...deps.lcl];
                lclDeps[i]["name"] = e.target.value;
                setDeps({ ...deps, lcl: lclDeps });
              }}
            />
            <ComponentAutocomplete index={i} />
            <Tooltip title={"Create component"}>
              <IconButton color="primary">
                <AddRounded />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      })}
      <Button
        variant="text"
        startIcon={<AddRounded />}
        onClick={addLclDeps}
      >
        Add Missing Local Dependency
      </Button>
    </DependencySectionLayout>
  );
}
