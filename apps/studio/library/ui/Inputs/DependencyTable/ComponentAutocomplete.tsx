import { useComponentForm } from "@/app/components/create/providers";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type ComponentAutocompleteOption = {
  id: string;
  label: string;
};

const initialOptions: ComponentAutocompleteOption[] = [
  { label: "Styles Module", id: "styles" },
];

export function ComponentAutocomplete({ index }: { index: number }) {
  const { deps, setDeps } = useComponentForm();
  const [value, setValue] = useState<ComponentAutocompleteOption | null>(null);
  useEffect(() => {
    if (value) {
      setDeps((prev) => {
        let lcl = [...prev.lcl];
        lcl[index].ver = value.id;
        return { ...prev, lcl };
      });
    }
  }, [value, index]);

  return (
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
          name="depsLclVer"
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
  );
}
