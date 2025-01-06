import { notFound } from "next/navigation";
import db from "@/db";
import CreateLibraryForm from "./form";
export default async function LibraryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const library = await db.libraries.findFirst({ where: { id } });
  console.log(id);

  if (!id || !library) return notFound();

  return <CreateLibraryForm library={library} />;
}
