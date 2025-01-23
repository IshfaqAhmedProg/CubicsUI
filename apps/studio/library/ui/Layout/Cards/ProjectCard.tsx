"use client";

import styleEnginesWithLogos from "@/library/constants/styleEngines";
import supportedLanguageWithIcons from "@/library/constants/supportedLangs";
import formatDate from "@/library/functions/formatDate";
import { Project } from "@/library/types/Project";
import { CalendarTodayRounded, UpdateRounded } from "@mui/icons-material";
import {
  Button,
  ButtonProps,
  Paper,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import DateText from "../../Typography/DateText";

export default function ProjectCard({
  project,
  ...rest
}: {
  project: Partial<Project>;
} & ButtonProps) {
  const supportedLang = supportedLanguageWithIcons.find(
    (sl) => sl.name == project.lang
  );
  const supportedStyle = styleEnginesWithLogos.find(
    (sl) => sl.name == project.styleEng
  );

  const LangLogo = supportedLang?.Logo;
  const StyleLogo = supportedStyle?.Logo;

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
        flexGrow={1}
      >
        <Stack
          direction={"row"}
          alignItems={"baseline"}
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
            component={Paper}
            gap={2}
            padding={1}
            maxHeight={"2rem"}
          >
            {LangLogo && <LangLogo sx={{ fontSize: "inherit" }} />}
            {StyleLogo && <StyleLogo sx={{ fontSize: "inherit" }} />}
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
      <Stack
        gap={1}
        alignSelf={"flex-start"}
      >
        <DateText
          date={project.created}
          icon={<CalendarTodayRounded fontSize="inherit" />}
          title={(date) => `Created on ${date}`}
        />
        {project.created?.getTime() != project.updated?.getTime() && (
          <DateText
            date={project.updated}
            icon={<UpdateRounded fontSize="inherit" />}
            title={(date) => `Modified on ${date}`}
          />
        )}
      </Stack>
    </Button>
  );
}
