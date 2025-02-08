import db from "@/db";
import ComponentFormProvider from "@/library/contexts/ComponentFormContext";
import { Typography } from "@mui/material";
import ComponentForm from "./form";
export default async function ComponentDetailsPage({
  params,
}: {
  params: Promise<{ cmpId: string }>;
}) {
  const id = (await params).cmpId;
  if (!id) return <Typography>No Component Id found</Typography>;
  const component = await db.components.findFirst({ where: { id } });
  if (!component)
    return <Typography>No Component with Id:{id} found</Typography>;
  const library = await db.libraries.findFirst({
    where: { id: component.libId },
  });
  if (!library) return <Typography>No library found</Typography>;
  const codeblocks = await db.codeblocks.findFirst({
    where: { cmpId: component.id },
  });

  return (
    <ComponentFormProvider
      component={component}
      library={library}
      codeblocks={codeblocks}
    >
      <ComponentForm />
    </ComponentFormProvider>
  );
}
