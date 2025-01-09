import { Stack } from "@mui/material";
import { LibraryConfigurations } from "./configurations";
import db from "@/db";
import { notFound } from "next/navigation";
import LibraryDetails from "./details";
import LibraryProvider from "./providers";
import DeleteLibraryButton from "./delete";

export default async function CreateLibraryForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const library = await db.libraries.findFirst({
    where: { id },
    include: { configurations: true },
  });

  if (!id || !library) return notFound();

  return (
    <LibraryProvider
      library={library}
      configurations={library.configurations}
    >
      <Stack
        component={"form"}
        gap={3}
      >
        <LibraryDetails />
        <LibraryConfigurations />
        <DeleteLibraryButton />
      </Stack>
    </LibraryProvider>
  );
}
