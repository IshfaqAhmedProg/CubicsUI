import { Stack, StackProps } from "@mui/material";

export default function Viewport(props: StackProps) {
  const { children, ...rest } = props;

  return (
    <Stack
      component={"main"}
      id={"viewport"}
      height={"calc(100vh - var(--header-height))"}
      position={"relative"}
      pt={2}
      px={2}
      overflow={"auto"}
      {...rest}
    >
      {children}
    </Stack>
  );
}
