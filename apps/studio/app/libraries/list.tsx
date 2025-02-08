import { Stack, Typography } from "@mui/material";
import LibraryCard from "@/library/ui/Layout/Cards/LibraryCard";
import Link from "next/link";
import { readLibariesAction } from "./actions";

export default async function LibrariesList() {
  const libraries = await readLibariesAction(10);

  return (
    <Stack gap={2}>
      {libraries.length == 0 ? (
        <Typography>No libraries found!</Typography>
      ) : (
        libraries.map((library) => (
          <LibraryCard
            LinkComponent={Link}
            href={`/libraries/${library.id}`}
            key={library.id}
            library={library}
          />
        ))
      )}
    </Stack>
  );
}
