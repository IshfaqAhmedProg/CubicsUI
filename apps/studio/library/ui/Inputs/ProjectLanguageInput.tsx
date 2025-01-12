import supportedLanguageWithIcons from "@/library/constants/supportedLangs";
import { projects } from "@cubicsui/db";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  ListItemText,
  FormControlProps,
} from "@mui/material";
import { capitalize } from "lodash";

interface ProjectLanguageInputProps extends FormControlProps {
  project?: projects;
}

export default function ProjectLanguageInput({
  project,
  ...rest
}: ProjectLanguageInputProps) {
  return (
    <FormControl {...rest}>
      <InputLabel id="lang-label">Language</InputLabel>
      <Select
        labelId="lang-label"
        id="lang"
        defaultValue={project?.lang ?? supportedLanguageWithIcons[0].name}
        name="lang"
        label="Language"
      >
        {supportedLanguageWithIcons.map((lang) => {
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
      </Select>
    </FormControl>
  );
}
