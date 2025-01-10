import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import db from "@/db";
import LibraryProvider from "./providers";
import DeleteLibraryButton from "./delete";

interface LibraryLayoutProps {
  children: ReactNode;
  details: ReactNode;
  configurations: ReactNode;
  params: Promise<{ id: string }>;
}

export default async function LibraryLayout({
  children,
  details,
  configurations,
  params,
}: LibraryLayoutProps) {
  const id = (await params).id;
  if (!id) return notFound();

  const library = await db.libraries.findFirst({ where: { id } });
  if (!library)
    return (
      <Typography color="error">
        Library with id:{id} does not exist in the database
      </Typography>
    );

  return (
    <LibraryProvider library={library}>
      <Stack gap={3}>
        {children}
        {details}
        {configurations}
        <DeleteLibraryButton />
      </Stack>
    </LibraryProvider>
  );
}
