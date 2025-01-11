import db from "@/db";
import { AddRounded } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function LibraryComponentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const libId = (await params).id;
  if (!libId) return notFound();

  const components = await db.components.findMany({ where: { libId } });

  return (
    <Stack
      gap={3}
      component={Paper}
      p={2}
    >
      {components.length == 0 ? (
        <Stack
          alignItems={"center"}
          gap={3}
        >
          <Typography variant="body2">Start by creating a component</Typography>
          <Button
            startIcon={<AddRounded />}
            LinkComponent={Link}
            href={`/components/create?libId=${libId}`}
          >
            Create Component
          </Button>
        </Stack>
      ) : (
        components.map((c) => {
          return <Typography key={c.id}>{c.name}</Typography>;
        })
      )}
    </Stack>
  );
}
