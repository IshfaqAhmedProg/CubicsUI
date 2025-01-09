import { Stack, Typography } from "@mui/material";
import db from "@/db";
import LibraryCard from "@/library/ui/Layout/Cards/LibraryCard";
import Link from "next/link";

export default async function LibrariesList() {
  const results = await db.libraries.findMany({ take: 10 });

  return (
    <Stack gap={2}>
      {results.length == 0 ? (
        <Typography>No libraries found!</Typography>
      ) : (
        results.map((r) => (
          <LibraryCard
            LinkComponent={Link}
            href={`/libraries/${r.id}`}
            key={r.id}
            library={r}
          />
        ))
      )}
    </Stack>
  );
}
