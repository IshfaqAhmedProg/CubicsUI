"use client";
import { Prisma } from "@cubicsui/db";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { deleteLibraryAction } from "./actions";

export default function LibrariesList({
  results,
}: {
  results: Prisma.$librariesPayload["scalars"][];
}) {
  console.log(results);
  return (
    <List>
      {results.length == 0 ? (
        <ListItem>
          <ListItemText>No libraries found!</ListItemText>
        </ListItem>
      ) : (
        results.map((r, i) => (
          <ListItem key={r.id}>
            <Button onClick={async () => await deleteLibraryAction(r.id)}>
              Delete
            </Button>
            <ListItemButton
              LinkComponent={Link}
              href={`/libraries/${r.id}`}
            >
              {r.name}
            </ListItemButton>
          </ListItem>
        ))
      )}
    </List>
  );
}
