"use client";

import styleExtWithLogos from "@/library/constants/styleEngines";
import { projects, StyleExtension } from "@cubicsui/db";
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

interface ProjectStyleExtInputProps extends FormControlProps {
  project?: projects;
}

export default function ProjectStyleExtInput({
  project,
  ...rest
}: ProjectStyleExtInputProps) {
  const [styleExt, setStyleExt] = useState<StyleExtension>(
    project?.styleExt ?? styleExtWithLogos[0].name
  );
  return (
    <FormControl {...rest}>
      <InputLabel id="styleExt-label">Style Engine</InputLabel>
      <Select
        labelId="styleExt-label"
        id="styleExt"
        value={styleExt}
        onChange={(v) => setStyleExt(v.target.value as StyleExtension)}
        name="styleExt"
        label="Style Extension"
      >
        {styleExtWithLogos.map((lang) => {
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
                <ListItemText primary={`.${name}`} />
              </Stack>
            </MenuItem>
          );
        })}
        <MenuItem disabled>More coming soon!</MenuItem>
      </Select>
    </FormControl>
  );
}
