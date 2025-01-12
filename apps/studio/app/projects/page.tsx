import { Stack } from "@mui/material";
import ProjectsList from "./list";
import CreateProjectButton from "./create";
import { Suspense } from "react";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";

export default async function LibrariesPage() {
  return (
    <Stack gap={3}>
      <Stack alignItems={"flex-end"}>
        <CreateProjectButton />
      </Stack>
      <Suspense
        fallback={
          <Spinner
            centered
            size={24}
          />
        }
      >
        <ProjectsList />
      </Suspense>
    </Stack>
  );
}
