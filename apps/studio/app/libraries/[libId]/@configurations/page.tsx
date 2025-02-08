import { AddRounded } from "@mui/icons-material";
import { Paper, Stack, Typography } from "@mui/material";
import { ConfigurationSuggestions } from "./suggestions";
import { knownConfigurations } from "@/library/constants/knownConfigurations";
import { notFound } from "next/navigation";
import db from "@/db";
import ConfigurationButton from "./button";
import Title from "@/library/ui/Typography/Title";

export default async function ConfigurationsPage({
  params,
}: {
  params: Promise<{ libId: string }>;
}) {
  const libId = (await params).libId;
  if (!libId) return notFound();

  const configurations = await db.configurations.findMany({
    where: { libId },
  });

  return (
    <Stack
      id={"configurations-container"}
      component={Paper}
      py={3}
      px={4}
      gap={2}
    >
      <Title>Configurations</Title>
      <Typography variant="body2">
        Configurations help CubicsUI assess your code block when building
        components to help you define dependencies, path aliases etc. quicker.
      </Typography>
      <Typography
        variant="body2"
        color="text.primary"
      >
        *Note: These configurations are used only when creating new components
        in the Studio, they are not reusable blocks of code accessible by the
        CLI if you want reusable configurations instead create the configuration as a component{" "}
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
              variant="text"
              key={c.id}
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
