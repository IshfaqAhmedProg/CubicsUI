import styleEnginesWithLogos from "@/library/constants/styleEngines";
import { projects } from "@cubicsui/db";
import {
  FormControl,
  FormControlProps,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { capitalize } from "lodash";

interface ProjectStyleEngineInputProps extends FormControlProps {
  project?: projects;
}

export default function ProjectStyleEngineInput({
  project,
  ...rest
}: ProjectStyleEngineInputProps) {
  return (
    <FormControl {...rest}>
      <InputLabel id="styleEngine-label">Style Engine</InputLabel>
      <Select
        labelId="styleEngine-label"
        id="styleEngine"
        defaultValue={project?.styleEngine ?? styleEnginesWithLogos[0].name}
        name="styleEngine"
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
                <ListItemText primary={capitalize(name)} />
              </Stack>
            </MenuItem>
          );
        })}
        <MenuItem disabled>More coming soon!</MenuItem>
      </Select>
    </FormControl>
  );
}
