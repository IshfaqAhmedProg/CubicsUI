import db from "@/configs/db";
import Link from "next/link";
export default async function ListPage() {
  const results = await db.components.findMany({ take: 10 });
  return (
    <ol>
      {results.length == 0 ? (
        <li>No components found!</li>
      ) : (
        results.map((r) => (
          <li key={r.name}>
            <Link href={`/dashboard/list/${r.id}`}>{r.name}</Link>
          </li>
        ))
      )}
    </ol>
  );
}
