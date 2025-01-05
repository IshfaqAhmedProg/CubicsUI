import db from "@/db";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { AddRounded } from "@mui/icons-material";
import LibrariesList from "./list";
import CreateLibraryButton from "./create";

export default async function LibrariesPage() {
  const results = await db.libraries.findMany({ take: 10 });

  return (
    <Stack>
      <Stack alignItems={"flex-end"}>
        <CreateLibraryButton />
      </Stack>
      <LibrariesList results={results} />
    </Stack>
  );
}
