import { useComponentForm } from "@/app/components/create/providers";
import {
  AutocompleteInputChangeReason,
  Autocomplete,
  Chip,
  TextField,
} from "@mui/material";
import { useState, Fragment } from "react";
import HiddenInput from "../../Inputs/HiddenInput";

export default function ComponentTagsInput() {
  const { tags, setTags, formPending } = useComponentForm();
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason
  ) {
    const options = value.split(" ");
    if (options.length > 1) {
      setTags(
        tags
          .concat(options)
          .map((x) => x.trim())
          .filter((x) => x)
      );
      setInputValue("");
    } else {
      setInputValue(value);
    }
  }
  return (
    <Autocomplete
      disabled={formPending}
      multiple
      options={[]}
      value={tags}
      onChange={(event, newValue) => setTags(newValue)}
      inputValue={inputValue}
      freeSolo
      onInputChange={handleInputChange}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Fragment key={key}>
              <HiddenInput
                name="tags"
                value={option}
              />
              <Chip
                label={option}
                {...tagProps}
              />
            </Fragment>
          );
        })
      }
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Tags"
          />
        );
      }}
    />
  );
}
