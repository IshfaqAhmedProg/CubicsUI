import { useComponentForm } from "@/app/components/create/providers";
import { Stack, Paper, Typography, Button } from "@mui/material";
import React from "react";

export default function ComponentStatusBar() {
  const { formPending, formState } = useComponentForm();
  return (
    <Stack
      component={Paper}
      direction={"row"}
      justifyContent={"space-between"}
      position={"absolute"}
      alignItems={"center"}
      top={0}
      left={0}
      width={"100%"}
      px={4}
      py={2}
    >
      <Typography
        color={Boolean(formState?.errors?.FORM) ? "error" : "textPrimary"}
      >
        {formState?.errors?.FORM}
      </Typography>
      <Button
        disabled={formPending}
        type="submit"
      >
        Create Component
      </Button>
    </Stack>
  );
}
