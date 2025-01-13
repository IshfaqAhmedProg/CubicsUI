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
      <InputLabel id="styleEng-label">Style Engine</InputLabel>
      <Select
        labelId="styleEng-label"
        id="styleEng"
        defaultValue={project?.styleEng ?? styleEnginesWithLogos[0].name}
        name="styleEng"
        label="Style Engine"
      >
        {styleEnginesWithLogos.map((lang) => {
          const { name, Logo } = lang;
          const formattedName = ["css", "scss"].includes(name)
            ? name.toUpperCase()
            : capitalize(name);
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
                <ListItemText primary={formattedName} />
              </Stack>
            </MenuItem>
          );
        })}
        <MenuItem disabled>More coming soon!</MenuItem>
      </Select>
    </FormControl>
  );
}
