"use client";

import {
  samplePkgJson,
  sampleTsconfig,
} from "@/library/constants/sampleCodeBlocks";
import { Library } from "@/library/types/Library";
import { Suggestion } from "@/library/types/Suggestions";
import { NodeJSLogo, TypescriptLogo } from "@/library/ui/Brand/Logos";
import { configurations } from "@cubicsui/db";
import { Paper, Stack, Typography } from "@mui/material";
import { useLibrary } from "./providers";
import ConfigurationButton from "./configurations";

export const knownConfigurations = {
  packageJson: {
    itemName: "package.json",
    title: "Add a package.json",
    icon: <NodeJSLogo />,
    desc: "A package.json file helps CubicsUI assess third-party dependencies used in the library.",
  },
  tsconfigJson: {
    itemName: "tsconfig.json",
    title: "Add a tsconfig.json",
    icon: <TypescriptLogo />,
    desc: "A tsconfig file helps CubicsUI assess import aliases and other typescript configurations.",
  },
};

/**
 * Component that renders the suggested configurations that a user might need
 */
export function SuggestedConfigs() {
  const { library, configurations } = useLibrary();
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
      <Typography
        variant="body2"
        color="textSecondary"
      >
        Suggested
      </Typography>
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
