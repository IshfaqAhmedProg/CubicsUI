import { Stack, Typography } from "@mui/material";
import CreateLibraryButton from "./libraries/create";

export default async function Home() {
  return (
    <Stack
      alignItems={"center"}
      gap={4}
      my="auto"
    >
      <Typography
        color="textSecondary"
        variant="h4"
        fontFamily={"var(--font-h)"}
      >
        Get started!
      </Typography>

      <Typography color="textSecondary">
        Start your journey by creating your first library
      </Typography>
      <CreateLibraryButton />
    </Stack>
  );
}
