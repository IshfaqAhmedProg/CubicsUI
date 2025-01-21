import { useComponentForm } from "@/app/components/create/providers";
import { Stack, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function ComponentActionBar({
  actions,
}: {
  actions: ReactNode;
}) {
  const { formState } = useComponentForm();
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
        color={Boolean(formState?.errors?.formError) ? "error" : "textPrimary"}
      >
        {formState?.errors?.formError}
      </Typography>
      {actions}
    </Stack>
  );
}
