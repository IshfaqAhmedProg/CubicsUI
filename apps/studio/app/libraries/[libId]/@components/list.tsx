"use client";
import { components } from "@cubicsui/db";
import ComponentCard from "@/library/ui/Layout/Cards/ComponentCard";
import {
  AccountTreeRounded,
  CodeRounded
} from "@mui/icons-material";
import { Button } from "@mui/material";

export default function ComponentsList({
  components,
}: {
  components: components[];
}) {
  return components.map((c) => {
    return (
      <ComponentCard
        component={c}
        // size="large"
        key={c.id}
        actions={
          <>
            <Button>
              <CodeRounded sx={{ color: "text.secondary" }} />
            </Button>
            <Button>
              <AccountTreeRounded sx={{ color: "text.secondary" }} />
            </Button>
          </>
        }
      />
    );
  });
}
