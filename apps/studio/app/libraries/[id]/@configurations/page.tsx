import { AddRounded } from "@mui/icons-material";
import { Paper, Stack } from "@mui/material";
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
    <>
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
    </>
  );
}
