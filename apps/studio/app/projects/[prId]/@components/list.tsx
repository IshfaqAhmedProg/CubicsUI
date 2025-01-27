"use client";
import { components } from "@cubicsui/db";
import { useActionState, useState } from "react";
import ComponentCard, {
  ComponentSkeleton,
} from "@/library/ui/Layout/Cards/ComponentCard";
import { DeleteForeverRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { deleteComponent } from "@/app/components/actions";
import { FormActionReturnType } from "@/library/types/ActionReturnTypes";
import Spinner from "@/library/ui/Navigation/Spinner/Spinner";

export default function ComponentsList({
  components,
}: {
  components: components[];
}) {
  const [state, setState] = useState<FormActionReturnType<components> | void>(
    {}
  );
  const [loading, setLoading] = useState(false);
  async function handleDelete(id: string) {
    setLoading(true);
    const fd = new FormData();
    fd.append("cmpId", id);
    const res = await deleteComponent({}, fd);
    setState(res);
    setLoading(false);
  }
  console.log({ state });

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
            {loading ? <Spinner /> : <DeleteForeverRounded />}
          </Button>
        }
      />
    );
  });
}
