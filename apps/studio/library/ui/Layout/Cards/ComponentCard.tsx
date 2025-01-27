import { components } from "@cubicsui/db";
import {
  Button,
  ButtonGroup,
  Paper,
  Skeleton,
  SkeletonProps,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function ComponentSkeleton(props: SkeletonProps) {
  return (
    <Skeleton
      variant="rounded"
      width={"100%"}
      sx={{ minHeight: "2.5rem" }}
      {...props}
    />
  );
}

export interface ComponentCardProps {
  component: components;
  size?: "small" | "large";
  action?: ReactNode | ((component: components) => ReactNode);
}
export default function ComponentCard(props: ComponentCardProps) {
  const { component, size = "small", action } = props;
  const router = useRouter();

  return (
    <ButtonGroup
      variant="text"
      size="small"
      component={Paper}
    >
      <Button
        sx={{
          p: 2,
          flexGrow: 1,
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          bgcolor: "background.paper",
          borderColor: "divider",
          color: "text.primary",
        }}
        onClick={() => {
          router.push(`/components/${component.id}`);
        }}
      >
        <Typography fontWeight={"bold"}>{component.name}</Typography>
        <Typography variant="body2">{component.outPath}</Typography>
      </Button>
      {action && (typeof action == "function" ? action(component) : action)}
    </ButtonGroup>
  );
}
