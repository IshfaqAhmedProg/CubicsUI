import db from "@/configs/db";
import CreateComponentForm from "./form";
import { notFound } from "next/navigation";

type SearchParams = Promise<{ libraryId: string }>;

export default async function CreatePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { libraryId } = await searchParams;

  const library = await db.libraries.findFirst({ where: { id: libraryId } });

  if (!library || !libraryId) return notFound();

  return <CreateComponentForm library={library} />;
}
