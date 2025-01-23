"use client";
import { components } from "@cubicsui/db";
import { useState } from "react";
import { deleteComponentAction } from "./actions";
import ComponentCard from "@/library/ui/Layout/Cards/ComponentCard";

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
      />
    );
  });
}
