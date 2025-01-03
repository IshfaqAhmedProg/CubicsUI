import { AddRounded, LibraryBooksRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

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
      <Button
        size="large"
        variant="contained"
        endIcon={<LibraryBooksRounded />}
        startIcon={<AddRounded />}
      >
        Create Library
      </Button>
    </Stack>
  );
}
