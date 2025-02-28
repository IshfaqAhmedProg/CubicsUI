import db from "@/db";
import { AddRounded } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";
import ComponentsList from "./list";
import Title from "@/library/ui/Typography/Title";

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
      py={3}
      px={4}
      height={"100%"}
    >
      <Title>Components</Title>
      {components.length !== 0 && (
        <Button
          startIcon={<AddRounded />}
          LinkComponent={Link}
          href={`/components/create?prId=${prId}`}
        >
          Add Component to project
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
            Add Component to project
          </Button>
        </Stack>
      ) : (
        <ComponentsList components={components} />
      )}
    </Stack>
  );
}
