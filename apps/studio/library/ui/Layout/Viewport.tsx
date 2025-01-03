import { Stack, StackProps } from "@mui/material";

export default function Viewport(props: StackProps) {
  const { children, ...rest } = props;

  return (
    <Stack
      component={"main"}
      id={"viewport"}
      height={"calc(100vh - var(--header-height))"}
      mt={2}
      ml={2}
      pt={2}
      pl={2}
      overflow={"auto"}
      {...rest}
    >
      {children}
    </Stack>
  );
}
