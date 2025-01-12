"use client";

import supportedLanguageWithIcons from "@/library/constants/supportedLangs";
import formatDate from "@/library/functions/formatDate";
import { Project } from "@/library/types/Library";
import {
  CalendarTodayRounded,
  UpdateRounded,
  WarningRounded,
} from "@mui/icons-material";
import {
  Button,
  ButtonProps,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

export default function ProjectCard({
  project,
  ...rest
}: {
  project: Partial<Project>;
} & ButtonProps) {
  const theme = useTheme();
  const supportedLang = supportedLanguageWithIcons.find(
    (sl) => sl.name == project.lang
  );

  const LangLogo = supportedLang ? supportedLang.Logo : WarningRounded;
  const formattedDates = {
    created: formatDate(project.created),
    updated: formatDate(project.updated),
  };

  return (
    <Button
      {...rest}
      variant="outlined"
      sx={{
        px: 6,
        py: 2,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        borderColor: "var(--palette-divider)",
      }}
    >
      <Stack
        alignItems={"flex-start"}
        gap={2}
      >
        <Typography
          fontWeight={"bold"}
          color="textPrimary"
        >
          {project.name}
        </Typography>

        {formattedDates.created == formattedDates.updated ? (
          <Tooltip title={`Created on ${formattedDates.created}`}>
            <Typography
              variant="body2"
              display={"flex"}
              alignItems={"center"}
              gap={1}
            >
              <CalendarTodayRounded fontSize="inherit" />
              {formattedDates.created}
            </Typography>
          </Tooltip>
        ) : (
          <Tooltip title={`Modified on ${formattedDates.updated}`}>
            <Typography
              variant="body2"
              display={"flex"}
              alignItems={"center"}
              gap={1}
            >
              <UpdateRounded fontSize="inherit" />
              {formattedDates.updated}
            </Typography>
          </Tooltip>
        )}
      </Stack>
      <Stack color={"text.secondary"}>
        <LangLogo />
      </Stack>
    </Button>
  );
}
