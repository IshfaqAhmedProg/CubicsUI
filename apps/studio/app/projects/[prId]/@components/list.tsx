"use client";
import { components } from "@cubicsui/db";
import { useState } from "react";
import { deleteComponentAction } from "./actions";
import ComponentCard from "@/library/ui/Layout/Cards/ComponentCard";
import { DeleteForeverRounded } from "@mui/icons-material";
import { Button } from "@mui/material";

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
      <ComponentCard
        component={c}
        // size="large"
        key={c.id}
        action={
          <Button
            color="error"
            onClick={() => handleDelete(c.id)}
          >
            <DeleteForeverRounded />
          </Button>
        }
      />
    );
  });
}
