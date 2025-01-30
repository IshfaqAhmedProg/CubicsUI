import formatDate from "@/library/functions/formatDate";
import { Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Fragment, ReactNode } from "react";

export default function DateText({
  date,
  icon,
  title,
}: {
  date?: Date;
  icon?: ReactNode;
  title?: string | ((formattedDate: string) => string);
}) {
  const { breakpoints } = useTheme();

  const formattedDate = formatDate(date);

  let titleToRender = formattedDate;
  if (typeof title == "string") titleToRender = title;
  if (typeof title == "function") titleToRender = title(formattedDate);

  let dateToRender = formattedDate;
  if (date && useMediaQuery(breakpoints.down("sm")))
    dateToRender = formatDate(date, true);

  if (!date) return null;
  return (
    <Tooltip title={titleToRender}>
      <Typography
        variant="body2"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexShrink: 0,
          fontSize: { xs: ".625rem", sm: ".75rem" },
        }}
      >
        {icon && icon}
        {dateToRender}
      </Typography>
    </Tooltip>
  );
}
