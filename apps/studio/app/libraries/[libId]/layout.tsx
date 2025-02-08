import { Grid2 as Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import LibraryProvider from "../../../library/contexts/LibraryContext";
import { ExpandMoreRounded } from "@mui/icons-material";
import CollapsibleSection from "@/library/ui/Layout/CollapsibleSection";
import DeleteWithConfirmation from "@/library/ui/Inputs/DeleteWithConfirmation";
import { deleteLibraryAction, readLibraryAction } from "../actions";

interface LibraryLayoutProps {
  children: ReactNode;
  details: ReactNode;
  configurations: ReactNode;
  components: ReactNode;
  params: Promise<{ libId: string }>;
}

export default async function LibraryLayout({
  children,
  details,
  configurations,
  components,
  params,
}: LibraryLayoutProps) {
  const id = (await params).libId;
  if (!id) return notFound();
  const library = await readLibraryAction(id);
  if (!library)
    return (
      <Typography color="error">
        Library with id:{id} does not exist in the database
      </Typography>
    );

  return (
    <LibraryProvider library={library}>
      <Grid
        container
        spacing={2}
        height={"100%"}
      >
        {children}

        <Grid
          size={6}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          height={"100%"}
          overflow={"hidden auto"}
        >
          <CollapsibleSection
            title={"Details"}
            defaultExpanded
            expandIcon={<ExpandMoreRounded />}
          >
            {details}
          </CollapsibleSection>

          {configurations}
          <DeleteWithConfirmation
            itemToDelete={library.name}
            formDatas={[{ name: "libId", value: library.id }]}
            deleteAction={deleteLibraryAction}
            deleteMessage={`Are you sure you want to delete "${library.name}" and
                all its configurations and components? This action is
                irreversible.`}
            redirectTo="/libraries"
          />
        </Grid>
        <Grid size={6}>{components}</Grid>
      </Grid>
    </LibraryProvider>
  );
}
