import db from "@/db";
import { AddRounded } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";
import ComponentsList from "./list";

export default async function ProjectComponentsPage({
  params,
}: {
  params: Promise<{ prId: string }>;
}) {
  const prId = (await params).prId;
  if (!prId) return notFound();

  const components = await db.components.findMany({ where: { prId } });

  return (
    <Stack
      gap={3}
      component={Paper}
      p={2}
    >
      {components.length !== 0 && (
        <Button
          startIcon={<AddRounded />}
          LinkComponent={Link}
          href={`/components/create?prId=${prId}`}
        >
          Add Component to library
        </Button>
      )}
      {components.length == 0 ? (
        <Stack
          alignItems={"center"}
          gap={3}
        >
          <Typography variant="body2">Start by adding a component</Typography>
          <Button
            startIcon={<AddRounded />}
            LinkComponent={Link}
            href={`/components/create?prId=${prId}`}
          >
            Add Component to library
          </Button>
        </Stack>
      ) : (
        <ComponentsList components={components} />
      )}
    </Stack>
  );
}
