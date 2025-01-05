import { notFound } from "next/navigation";
import db from "@/db";
export default async function LibraryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const library = await db.libraries.findFirst({ where: { id } });

  if (!id || !library) return notFound();

  return (
    <div>
      {(Object.keys(library) as (keyof typeof library)[]).map((k) => {
        return (
          <div key={k}>
            <p>{k}:</p>
            <p>{JSON.stringify(library[k])}</p>
          </div>
        );
      })}
    </div>
  );
}
