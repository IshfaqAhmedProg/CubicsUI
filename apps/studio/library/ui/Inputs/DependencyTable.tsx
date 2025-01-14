"use client";
import { useComponentFormStates } from "@/app/components/create/providers";
import {
  AddRounded,
  ArrowBackRounded,
  ArrowForwardRounded,
  DeleteRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

interface DependencyTableProps
  extends Pick<ReturnType<typeof useComponentFormStates>, "deps" | "setDeps"> {}

export default function DependencyTable({
  deps,
  setDeps,
}: DependencyTableProps) {
  function shiftFromLclToExt(index: number) {
    let lcl = [...deps.lcl],
      ext = [...deps.ext];
    ext.push(lcl[index]);
    lcl.splice(index, 1);
    setDeps({ lcl, ext });
  }
  function shiftFromExtToLcl(index: number) {
    let lcl = [...deps.lcl],
      ext = [...deps.ext];
    lcl.push(ext[index]);
    ext.splice(index, 1);
    setDeps({ lcl, ext });
  }
  function addExtDeps() {
    let ext = [...deps.ext];
    ext.push({ name: "", ver: "" });
    setDeps({ ...deps, ext });
  }
  function removeExtDeps(index: number) {
    let ext = [...deps.ext];
    ext.splice(index, 1);
    setDeps({ ...deps, ext });
  }
  function removeLclDeps(index: number) {
    let lcl = [...deps.lcl];
    lcl.splice(index, 1);
    setDeps({ ...deps, lcl });
  }
  function addLclDeps() {
    let lcl = [...deps.lcl];
    lcl.push({ name: "", ver: "" });
    setDeps({ ...deps, lcl });
  }
  return (
    <Stack
      component={Paper}
      direction={"row"}
      gap={2}
      px={3}
      py={4}
    >
      <Stack
        width={"100%"}
        gap={2}
      >
        <Typography variant="body2">External Dependencies</Typography>
        {deps.ext.map((e, i) => {
          return (
            <Stack
              key={e.name}
              direction={"row"}
              gap={1}
            >
              <TextField
                name="depsExtName"
                value={e.name}
                fullWidth
                onChange={(e) => {
                  let extDeps = [...deps.ext];
                  extDeps[i]["name"] = e.target.value;
                  setDeps({ ...deps, ext: extDeps });
                }}
              />
              <TextField
                name="depsExtVer"
                value={e.ver}
                sx={{ maxWidth: "15ch" }}
                onChange={(e) => {
                  let extDeps = [...deps.ext];
                  extDeps[i]["ver"] = e.target.value;
                  setDeps({ ...deps, ext: extDeps });
                }}
              />
              <Stack direction={"row"}>
                <Tooltip title={`Remove "${e.name}"`}>
                  <IconButton onClick={() => removeExtDeps(i)}>
                    <RemoveCircleOutlineRounded color="error" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Shift "${e.name}" to Local Dependencies`}>
                  <IconButton onClick={() => shiftFromExtToLcl(i)}>
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
      </Stack>
      <Divider
        orientation="vertical"
        flexItem
      />
      <Stack
        width={"100%"}
        gap={2}
      >
        <Typography variant="body2">Local Dependencies</Typography>
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
                    <ArrowBackRounded color="disabled" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Remove "${l.name}"`}>
                  <IconButton onClick={() => removeLclDeps(i)}>
                    <RemoveCircleOutlineRounded color="disabled" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <TextField
                name="depsLclName"
                value={l.name}
                fullWidth
                onChange={(e) => {
                  let lclDeps = [...deps.lcl];
                  lclDeps[i]["name"] = e.target.value;
                  setDeps({ ...deps, lcl: lclDeps });
                }}
              />
              <TextField
                name="depsLclVer"
                value={l.ver}
                fullWidth
                onChange={(e) => {
                  let lclDeps = [...deps.lcl];
                  lclDeps[i]["ver"] = e.target.value;
                  setDeps({ ...deps, lcl: lclDeps });
                }}
              />
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
      </Stack>
    </Stack>
  );
}
