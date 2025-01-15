import { useComponentForm } from "@/app/components/create/providers";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import HiddenInput from "../HiddenInput";

type ComponentAutocompleteOption = {
  id: string;
  label: string;
};

const initialOptions: ComponentAutocompleteOption[] = [
  { label: "Styles Module", id: "styles" },
];

export function ComponentAutocomplete({ index }: { index: number }) {
  const { deps, setDeps } = useComponentForm();
  const localDepsComponentId = deps.lcl[index].cmpId;

  const initialValue =
    initialOptions.find((io) => io.id == localDepsComponentId) ?? null;

  const [value, setValue] = useState<ComponentAutocompleteOption | null>(
    initialValue
  );
  useEffect(() => {
    if (value) {
      setDeps((prev) => {
        let lcl = [...prev.lcl];
        lcl[index].cmpId = value.id;
        return { ...prev, lcl };
      });
    }
  }, [value, index]);

  return (
    <>
      <HiddenInput
        value={localDepsComponentId}
        name="depsLclCmpId"
      />
      <Autocomplete
        options={initialOptions}
        value={value}
        onChange={(e, v) => {
          setValue(v);
        }}
        fullWidth
        renderInput={(params) => (
          <TextField
            label={index == 0 ? "Component or Styles" : undefined}
            {...params}
          />
        )}
        renderOption={({ key, ...props }, option) => {
          return (
            <MenuItem
              key={key}
              {...props}
            >
              {option.label}
            </MenuItem>
          );
        }}
      />
    </>
  );
}
