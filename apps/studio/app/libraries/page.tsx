import { Stack } from "@mui/material";
import LibrariesList from "./list";
import CreateLibraryButton from "./create";
import { Suspense } from "react";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";

export default async function LibrariesPage() {
  return (
    <Stack>
      <Stack alignItems={"flex-end"}>
        <CreateLibraryButton />
      </Stack>
      <Suspense fallback={<Spinner />}>
        <LibrariesList />
      </Suspense>
    </Stack>
  );
}
