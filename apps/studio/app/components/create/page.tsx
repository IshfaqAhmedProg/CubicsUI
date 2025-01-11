import db from "@/db";
import CreateComponentForm from "./form";
import { notFound } from "next/navigation";

type SearchParams = Promise<{ libId: string }>;

export default async function CreatePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { libId } = await searchParams;

  const library = await db.libraries.findFirst({ where: { id: libId } });

  if (!library || !libId) return notFound();

  return <CreateComponentForm library={library} />;
}
