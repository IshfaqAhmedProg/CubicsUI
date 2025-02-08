import { Stack } from "@mui/material";
import LibrariesList from "./list";
import CreateLibraryButton from "./create";
import { Suspense } from "react";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";

export default async function LibrariesPage() {
  return (
    <Stack gap={3}>
      <Stack alignItems={"flex-end"}>
        <CreateLibraryButton />
      </Stack>
      <Suspense
        fallback={
          <Spinner
            centered
            size={24}
          />
        }
      >
        <LibrariesList />
      </Suspense>
    </Stack>
  );
}
