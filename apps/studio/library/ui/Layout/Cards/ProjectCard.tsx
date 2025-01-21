"use client";

import styleEnginesWithLogos from "@/library/constants/styleEngines";
import supportedLanguageWithIcons from "@/library/constants/supportedLangs";
import formatDate from "@/library/functions/formatDate";
import { Project } from "@/library/types/Project";
import {
  CalendarTodayRounded,
  UpdateRounded,
  WarningRounded,
} from "@mui/icons-material";
import {
  Button,
  ButtonProps,
  Paper,
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
  const supportedStyle = styleEnginesWithLogos.find(
    (sl) => sl.name == project.styleEng
  );

  const LangLogo = supportedLang?.Logo;
  const StyleLogo = supportedStyle?.Logo;
  const formattedDates = {
    created: formatDate(project.created),
    updated: formatDate(project.updated),
  };

  return (
    <Button
      {...rest}
      variant="outlined"
      sx={{
        py: 2,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        borderColor: "divider",
      }}
    >
      <Stack
        alignItems={"flex-start"}
        gap={2}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={3}
        >
          <Typography
            fontSize={"1.2em"}
            fontWeight={"bold"}
            color="textPrimary"
          >
            {project.name}
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            bgcolor={"background.paper"}
            borderRadius={1}
            padding={1}
          >
            {LangLogo && <LangLogo fontSize="small" />}
            {StyleLogo && <StyleLogo fontSize="small" />}
          </Stack>
        </Stack>
        <Typography
          variant="body2"
          width={"80%"}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {project.desc ? project.desc : "Project Description"}
        </Typography>
      </Stack>
      {formattedDates.created == formattedDates.updated ? (
        <Tooltip title={`Created on ${formattedDates.created}`}>
          <Typography
            variant="body2"
            display={"flex"}
            alignItems={"center"}
            gap={1}
            flexShrink={0}
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
            flexShrink={0}
          >
            <UpdateRounded fontSize="inherit" />
            {formattedDates.updated}
          </Typography>
        </Tooltip>
      )}
    </Button>
  );
}
