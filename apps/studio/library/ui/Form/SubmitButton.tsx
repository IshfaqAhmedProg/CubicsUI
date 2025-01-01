"use client";
import { Button } from "@mui/material";
import React, { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }: { children: ReactNode }) {
  const status = useFormStatus();
  return (
    <Button
      variant="contained"
      type="submit"
    >
      {status.pending ? "loading..." : children}
    </Button>
  );
}
