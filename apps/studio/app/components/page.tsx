import db from "@/configs/db";
import Link from "next/link";
import styles from "./page.module.css";

export default async function ListPage() {
  const results = await db.components.findMany({ take: 10 });
  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <Link href={"/components/create"}>Create New</Link>
      </div>
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
    </div>
  );
}
