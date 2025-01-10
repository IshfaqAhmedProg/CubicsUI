"use client";

import supportedLangs from "@/library/constants/supportedLangs";
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
import { useLibrary } from "../providers";
import { useActionState } from "react";
import { updateLibraryAction } from "./actions";

export default function LibraryDetailsPage() {
  const { library } = useLibrary();
  const [state, formAction, pending] = useActionState(updateLibraryAction, {});

  return (
    <Stack
      component={"form"}
      action={formAction}
      gap={3}
    >
      <HiddenInput
        name="libId"
        value={library.id}
      />
      <Stack
        direction={"row"}
        gap={3}
      >
        <TextField
          defaultValue={library.name}
          label={"Library Name"}
          name="name"
          sx={{ minWidth: "70%" }}
          disabled={pending}
        />
        <FormControl
          hiddenLabel
          required
          disabled={pending}
          fullWidth
        >
          <InputLabel id="lang-label">Language</InputLabel>
          <Select
            labelId="lang-label"
            id="lang"
            defaultValue={library.lang}
            name="lang"
            label="Language"
          >
            {supportedLangs.map((lang) => {
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
          </Select>
        </FormControl>
      </Stack>
      <TextField
        label="Description"
        placeholder="Enter a brief description describing the library"
        defaultValue={library.desc}
        name="desc"
        multiline
        minRows={4}
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
