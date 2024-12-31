import db from "@/configs/db";
import Link from "next/link";
import styles from "./page.module.scss";
import Flex from "@/library/ui/Layout/Flex";
import Grid from "@/library/ui/Layout/Grid";

export default async function ComponentsPage() {
  const results = await db.components.findMany({ take: 10 });
  return (
    <Grid
      gap="var(--sp-2)"
      className={styles.container}
    >
      <Flex
        justify="space-between"
        align="center"
      >
        <h2>Components</h2>
        <Link href={"/components/create"}>Create New</Link>
      </Flex>
      <ol>
        {results.length == 0 ? (
          <li>No components found!</li>
        ) : (
          results.map((r) => (
            <li key={r.name}>
              <Link href={`/components/${r.id}`}>{r.name}</Link>
            </li>
          ))
        )}
      </ol>
    </Grid>
  );
}
