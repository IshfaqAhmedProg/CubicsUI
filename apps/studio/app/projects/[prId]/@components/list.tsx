"use client";
import { components } from "@cubicsui/db";
import { DeleteForeverRounded } from "@mui/icons-material";
import { Stack, IconButton } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { deleteComponentAction } from "./actions";

export default function ComponentsList({
  components,
}: {
  components: components[];
}) {
  const [loading, setLoading] = useState(false);
  async function handleDelete(id: string) {
    setLoading(true);
    await deleteComponentAction(id);
    setLoading(false);
  }

  return components.map((c) => {
    return (
      <Stack
        key={c.id}
        direction={"row"}
        alignItems={"center"}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <Link
          key={c.id}
          href={`/components/${c.id}`}
        >
          {c.name}-{c.id}
        </Link>
        <IconButton
          disabled={loading}
          color="error"
          onClick={() => handleDelete(c.id)}
        >
          <DeleteForeverRounded />
        </IconButton>
      </Stack>
    );
  });
}
