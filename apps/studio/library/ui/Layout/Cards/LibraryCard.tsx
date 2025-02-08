"use client";

import styleExtWithLogos from "@/library/constants/styleEngines";
import supportedLanguageWithIcons from "@/library/constants/supportedLangs";
import { CalendarTodayRounded, UpdateRounded } from "@mui/icons-material";
import { Button, ButtonProps, Paper, Stack, Typography } from "@mui/material";
import DateText from "../../Typography/DateText";
import { libraries } from "@cubicsui/db";

export default function LibraryCard({
  library,
  ...rest
}: {
  library: Partial<libraries>;
} & ButtonProps) {
  const supportedLang = supportedLanguageWithIcons.find(
    (sl) => sl.name == library.lang
  );
  const supportedStyle = styleExtWithLogos.find(
    (sl) => sl.name == library.styleExt
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
            {library.name}
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
          {library.desc ? library.desc : "Library Description"}
        </Typography>
      </Stack>
      <Stack
        gap={1}
        alignSelf={"flex-start"}
      >
        <DateText
          date={library.created}
          icon={<CalendarTodayRounded fontSize="inherit" />}
          title={(date) => `Created on ${date}`}
        />
        {library.created?.getTime() != library.updated?.getTime() && (
          <DateText
            date={library.updated}
            icon={<UpdateRounded fontSize="inherit" />}
            title={(date) => `Modified on ${date}`}
          />
        )}
      </Stack>
    </Button>
  );
}
