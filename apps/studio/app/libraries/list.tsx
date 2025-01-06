import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import db from "@/db";

export default async function LibrariesList() {
  const results = await db.libraries.findMany({ take: 10 });

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
            <Button>Delete</Button>
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
