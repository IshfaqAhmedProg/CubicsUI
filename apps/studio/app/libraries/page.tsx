import React from "react";
import db from "@/configs/db";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { AddRounded } from "@mui/icons-material";
import LibrariesList from "./list";

export default async function LibrariesPage() {
  const results = await db.libraries.findMany({ take: 10 });

  return (
    <Stack>
      <Stack alignItems={"flex-end"}>
        <Button
          LinkComponent={Link}
          href={"/libraries/create"}
          startIcon={<AddRounded />}
        >
          Create New
        </Button>
      </Stack>
      <LibrariesList results={results} />
    </Stack>
  );
}
