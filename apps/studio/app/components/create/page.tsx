import CreateComponentForm from "./form";
import { notFound } from "next/navigation";
import ComponentFormProvider from "@/library/contexts/ComponentFormContext";
import { readLibraryAction } from "@/app/libraries/actions";

type SearchParams = Promise<{ libId: string }>;

export default async function CreatePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { libId } = await searchParams;

  const library = await readLibraryAction(libId);

  if (!library || !libId) return notFound();

  return (
    <ComponentFormProvider library={library}>
      <CreateComponentForm />
    </ComponentFormProvider>
  );
}
