import { Stack, Typography } from "@mui/material";
import CreateProjectButton from "./projects/create";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/projects");
  // return (
  //   <Stack
  //     alignItems={"center"}
  //     gap={4}
  //     my="auto"
  //   >
  //     <Typography
  //       color="textSecondary"
  //       variant="h4"
  //       fontFamily={"var(--font-h)"}
  //     >
  //       Get started!
  //     </Typography>

  //     <Typography color="textSecondary">
  //       Start your journey by creating your first project
  //     </Typography>
  //     <CreateProjectButton />
  //   </Stack>
  // );
}
