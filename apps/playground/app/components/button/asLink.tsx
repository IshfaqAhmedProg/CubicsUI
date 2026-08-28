"use client";

import { Button } from "@cubicsui/components";
import Link from "next/link";

export function AsLink() {
  return (
    <section>
      <p>
        This is a button that has NextJS <code>{"Link"}</code> passed to the{" "}
        <code>as</code> prop
      </p>
      <Button as={Link} href="/" variant="contained">
        Go to home
      </Button>
    </section>
  );
}
