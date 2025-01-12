import { AddRounded } from "@mui/icons-material";
import { Paper, Stack, Typography } from "@mui/material";
import { ConfigurationSuggestions } from "./suggestions";
import { knownConfigurations } from "@/library/constants/knownConfigurations";
import { notFound } from "next/navigation";
import db from "@/db";
import ConfigurationButton from "./button";

export default async function LibraryConfigurationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const libId = (await params).id;
  if (!libId) return notFound();

  const configurations = await db.configurations.findMany({ where: { libId } });

  return (
    <Stack
      id={"components-container"}
      gap={2}
    >
      <Typography variant="body2">
        Configurations help CubicsUI assess your code block when building
        components to help you define dependencies, path aliases etc. quicker.
      </Typography>
      <Typography
        variant="body2"
        color="error"
      >
        *Note: These configurations are used only when building components in
        CubicsUI studio, they are not reusable blocks of code accessible by the
        CLI if you want reusable configurations instead build a component{" "}
      </Typography>
      <ConfigurationSuggestions configurations={configurations} />
      <Stack
        direction={"row"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        gap={2}
        p={2}
        component={Paper}
      >
        <ConfigurationButton
          variant="text"
          startIcon={<AddRounded />}
        >
          Add New
        </ConfigurationButton>
        {configurations.map((c) => {
          return (
            <ConfigurationButton
              key={c.id}
              variant="outlined"
              configuration={c}
              startIcon={
                Object.values(knownConfigurations).find(
                  (kc) => kc.itemName == c.name
                )?.icon
              }
            >
              {c.name}
            </ConfigurationButton>
          );
        })}
      </Stack>
    </Stack>
  );
}
