import { useComponentForm } from "@/app/components/create/providers";
import {
  RemoveCircleOutlineRounded,
  ArrowForwardRounded,
  AddRounded,
} from "@mui/icons-material";
import {
  Stack,
  TextField,
  Tooltip,
  IconButton,
  Button,
  Select,
  MenuItem,
  ListItemText,
  FormControl,
  InputLabel,
} from "@mui/material";
import { createLocalDependency } from "@/library/functions/dependencyAnalyser";
import { DependencySectionLayout } from "../ComponentsForm/ComponentDependencies";

export const externalDependencyTypes = ["normal", "dev", "peer"];

export default function ExternalDependencyTable() {
  const { deps, setDeps, formPending } = useComponentForm();
  function shiftFromExtToLcl(index: number) {
    let lcl = [...deps.lcl],
      ext = [...deps.ext];
    lcl.push(createLocalDependency(ext[index].name));
    ext.splice(index, 1);
    setDeps({ lcl, ext });
  }
  function addExtDeps() {
    let ext = [...deps.ext];
    ext.push({ name: "", ver: "", type: "" });
    setDeps({ ...deps, ext });
  }
  function removeExtDeps(index: number) {
    let ext = [...deps.ext];
    ext.splice(index, 1);
    setDeps({ ...deps, ext });
  }
  return (
    <DependencySectionLayout title={"External Dependencies"}>
      {deps.ext.map((e, i) => {
        return (
          <Stack
            key={i}
            direction={"row"}
            gap={1}
            alignItems={"center"}
          >
            <TextField
              label={i == 0 ? "Name" : undefined}
              name="depsExtName"
              placeholder={"Name"}
              value={e.name}
              fullWidth
              onChange={(e) => {
                let extDeps = [...deps.ext];
                extDeps[i]["name"] = e.target.value;
                setDeps({ ...deps, ext: extDeps });
              }}
              disabled={formPending}
            />
            <TextField
              label={i == 0 ? "Version" : undefined}
              name="depsExtVer"
              value={e.ver}
              fullWidth
              onChange={(e) => {
                let extDeps = [...deps.ext];
                extDeps[i]["ver"] = e.target.value;
                setDeps({ ...deps, ext: extDeps });
              }}
              disabled={formPending}
            />
            <FormControl
              fullWidth
              disabled={formPending}
            >
              {/* Render label only for first element */}
              {i == 0 && <InputLabel id="depsExtType-label">Type</InputLabel>}
              <Select
                labelId={i == 0 ? "depsExtType-label" : undefined}
                id={"depsExtType"}
                name={"depsExtType"}
                label={"Type"}
                // Defaulting to "normal" if empty type field from db
                value={e.type ?? externalDependencyTypes[0]}
                onChange={(e) => {
                  let extDeps = [...deps.ext];
                  extDeps[i]["type"] = e.target.value;
                  setDeps({ ...deps, ext: extDeps });
                }}
              >
                {externalDependencyTypes.map((edt) => (
                  <MenuItem
                    value={edt}
                    key={edt}
                  >
                    <Stack
                      justifyContent={"center"}
                      height={"100%"}
                    >
                      <ListItemText primary={edt} />
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stack direction={"row"}>
              <Tooltip title={`Remove "${e.name}"`}>
                <IconButton
                  disabled={formPending}
                  onClick={() => removeExtDeps(i)}
                >
                  <RemoveCircleOutlineRounded color="error" />
                </IconButton>
              </Tooltip>
              <Tooltip title={`Shift "${e.name}" to Local Dependencies`}>
                <IconButton
                  disabled={formPending}
                  onClick={() => shiftFromExtToLcl(i)}
                >
                  <ArrowForwardRounded />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        );
      })}
      <Button
        variant="text"
        startIcon={<AddRounded />}
        onClick={addExtDeps}
      >
        Add Missing External Dependency
      </Button>
    </DependencySectionLayout>
  );
}
