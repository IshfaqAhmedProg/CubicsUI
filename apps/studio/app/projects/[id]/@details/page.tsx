"use client";

import supportedLanguageWithIcons from "@/library/constants/supportedLangs";
import HiddenInput from "@/library/ui/Inputs/HiddenInput";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";
import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useProject } from "../providers";
import { useActionState } from "react";
import { updateProjectAction } from "./actions";
import ProjectLanguageInput from "@/library/ui/Inputs/ProjectLanguageInput";
import ProjectStyleEngineInput from "@/library/ui/Inputs/ProjectStyleEngineInput";

export default function LibraryDetailsPage() {
  const { project } = useProject();
  const [state, formAction, pending] = useActionState(updateProjectAction, {});

  return (
    <Stack
      component={"form"}
      action={formAction}
      gap={3}
    >
      <HiddenInput
        name="prId"
        value={project.id}
      />
      <TextField
        defaultValue={project.name}
        label={"Library Name"}
        name="name"
        disabled={pending}
      />
      <Stack
        direction={"row"}
        gap={3}
      >
        <ProjectLanguageInput
          project={project}
          hiddenLabel
          required
          disabled={pending}
          fullWidth
        />
        <ProjectStyleEngineInput
          project={project}
          hiddenLabel
          required
          disabled={pending}
          fullWidth
        />
      </Stack>
      <TextField
        label="Description"
        placeholder="Enter a brief description describing the library"
        defaultValue={project.desc}
        name="desc"
        multiline
        minRows={2}
        disabled={pending}
      />
      <Button
        type="submit"
        disabled={pending}
        endIcon={pending ? <Spinner /> : undefined}
        variant="text"
      >
        Save
      </Button>
    </Stack>
  );
}