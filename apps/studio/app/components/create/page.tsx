import db from "@/db";
import CreateComponentForm from "./form";
import { notFound } from "next/navigation";

type SearchParams = Promise<{ prId: string }>;

export default async function CreatePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { prId } = await searchParams;

  const project = await db.projects.findFirst({ where: { id: prId } });

  if (!project || !prId) return notFound();

  return <CreateComponentForm project={project} />;
}
