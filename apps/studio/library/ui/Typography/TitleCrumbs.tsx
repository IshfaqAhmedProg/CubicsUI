"use client";
import { usePathname } from "next/navigation";
import { capitalize } from "lodash";
import { Breadcrumbs, Paper, Stack, Typography } from "@mui/material";
import { ChevronRightRounded, HomeRounded } from "@mui/icons-material";
import Link from "next/link";

export default function TitleCrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((p) => p);

  return (
    <Breadcrumbs
      maxItems={3}
      separator={<ChevronRightRounded color="disabled" />}
      sx={{
        color: "text.disabled",
        overflow: "auto hidden",
        fontFamily: "var(--font-h)",
      }}
    >
      {pathname !== "/" && (
        <Link
          className="linkIcon"
          href={"/"}
        >
          <HomeRounded color="disabled" />
        </Link>
      )}
      {paths.map((path: string, i: number) => {
        const fp = capitalize(path);
        const href = `/${paths.slice(0, i + 1).join("/")}`;
        const isPathActivePath = i === paths.length - 1;
        const link = <Link href={href}>{fp}</Link>;
        return (
          <Typography
            key={i}
            fontWeight={isPathActivePath ? "bold" : "normal"}
            fontFamily={"inherit"}
          >
            {isPathActivePath ? fp : link}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
}
