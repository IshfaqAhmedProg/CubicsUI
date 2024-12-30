"use client";
import React, { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }: { children: ReactNode }) {
  const status = useFormStatus();
  return (
    <button type="submit">{status.pending ? "loading..." : children}</button>
  );
}
