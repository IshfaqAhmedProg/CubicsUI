import { notFound } from "next/navigation";
import db from "@/db";
export default async function ComponentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const cmp = await db.libraries.findFirst({ where: { id } });

  if (!id || !cmp) return notFound();

  return (
    <div>
      {(Object.keys(cmp) as (keyof typeof cmp)[]).map((k) => {
        return (
          <div key={k}>
            <p>{k}:</p>
            <p>{JSON.stringify(cmp[k])}</p>
          </div>
        );
      })}
    </div>
  );
}
