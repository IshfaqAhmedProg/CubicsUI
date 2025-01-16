"use client";

import styleEnginesWithLogos from "@/library/constants/styleEngines";
import { projects, StyleEngine } from "@cubicsui/db";
import {
  FormControl,
  FormControlProps,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useState } from "react";

interface ProjectStyleEngineInputProps extends FormControlProps {
  project?: projects;
}

export default function ProjectStyleEngineInput({
  project,
  ...rest
}: ProjectStyleEngineInputProps) {
  const [styleEng, setStyleEng] = useState<StyleEngine>(
    project?.styleEng ?? styleEnginesWithLogos[0].name
  );
  return (
    <FormControl {...rest}>
      <InputLabel id="styleEng-label">Style Engine</InputLabel>
      <Select
        labelId="styleEng-label"
        id="styleEng"
        value={styleEng}
        onChange={(v) => setStyleEng(v.target.value as StyleEngine)}
        name="styleEng"
        label="Style Engine"
      >
        {styleEnginesWithLogos.map((lang) => {
          const { name, Logo } = lang;

          return (
            <MenuItem
              value={name}
              key={name}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={2}
                height={"100%"}
              >
                <Logo fontSize="small" />
                <ListItemText primary={name} />
              </Stack>
            </MenuItem>
          );
        })}
        <MenuItem disabled>More coming soon!</MenuItem>
      </Select>
    </FormControl>
  );
}
