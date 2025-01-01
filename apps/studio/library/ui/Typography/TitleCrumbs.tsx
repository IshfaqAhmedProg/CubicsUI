"use client";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import Flex from "../Layout/Flex";
import { capitalize } from "lodash";
import Typography from "./Typography";
import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { FiChevronRight, FiHome } from "react-icons/fi";
import { BiChevronRight, BiHome } from "react-icons/bi";

export default function TitleCrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((p) => p);

  return (
    <Flex
      gap={"var(--sp-1)"}
      align="center"
      style={{
        background: "var(--overlay)",
        padding: "var(--sp-1) var(--sp-2)",
      }}
    >
      <FaHome color="var(--text-faint)" />
      <FaChevronRight
        color="var(--text-faint)"
        fontSize={"0.8em"}
      />
      {paths.map((path, i) => {
        const fp = capitalize(path);
        const href = `/${paths.slice(0, i + 1).join("/")}`;
        const isPathActivePath = i === paths.length - 1;
        const color = !isPathActivePath ? "var(--text-faint)" : undefined;
        return (
          <Fragment key={i}>
            {i == 0 ? (
              <Typography
                as="h4"
                color={color}
              >
                <Link href={href}>{fp}</Link>
              </Typography>
            ) : (
              <Typography
                color={color}
                bold={isPathActivePath}
              >
                {isPathActivePath ? fp : <Link href={href}>{fp}</Link>}
              </Typography>
            )}
            {paths.length > 1 && !isPathActivePath && (
              <FaChevronRight
                color="var(--text-faint)"
                fontSize={"0.8em"}
              />
            )}
          </Fragment>
        );
      })}
    </Flex>
  );
}
