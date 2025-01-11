"use client";

import {
  samplePkgJson,
  sampleTsconfig,
} from "@/library/constants/sampleCodeBlocks";
import { Suggestion } from "@/library/types/Suggestions";
import { configurations } from "@cubicsui/db";
import { Paper, Stack, Typography } from "@mui/material";
import { useLibrary } from "../providers";
import ConfigurationButton from "./button";
import { knownConfigurations } from "../../../../library/constants/knownConfigurations";

interface ConfigurationSuggestionsProps {
  configurations: configurations[];
}

/**
 * Component that renders the suggested configurations that a user might need
 */
export function ConfigurationSuggestions({
  configurations,
}: ConfigurationSuggestionsProps) {
  const { library } = useLibrary();
  let suggestions: Suggestion[] = [];
  if (!configurations.some((cfg) => cfg.name == "package.json"))
    suggestions.push({
      ...knownConfigurations.packageJson,
      sample: samplePkgJson(library),
    });

  if (library?.lang == "Typescript") {
    if (!configurations.some((cfg) => cfg.name == "tsconfig.json"))
      suggestions.push({
        ...knownConfigurations.tsconfigJson,
        sample: sampleTsconfig,
      });
  }
  if (suggestions.length == 0) return <></>;
  return (
    <Stack
      component={Paper}
      id={"configurations-suggestions"}
      direction={"row"}
      alignItems={"center"}
      gap={2}
      p={2}
    >
      <Typography variant="body2">Suggested</Typography>
      {suggestions.map((sug) => (
        <ConfigurationButton
          key={sug.title}
          suggestion={sug}
          variant="outlined"
          startIcon={sug.icon}
          name={sug.itemName}
          title={sug.desc}
        >
          {sug.title}
        </ConfigurationButton>
      ))}
    </Stack>
  );
}
