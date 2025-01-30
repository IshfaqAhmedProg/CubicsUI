import { Typography } from "@mui/material";
import React, { ComponentProps } from "react";

export default function HiddenInput({
  name,
  staticValue,
  ...props
}: ComponentProps<"input"> & { name: string; staticValue?: string }) {
  if (staticValue)
    return (
      <>
        <Typography
          fontWeight={"bold"}
          color="textSecondary"
        >
          {staticValue}
        </Typography>
        <input
          hidden
          name={name}
          id={name}
          value={staticValue}
          readOnly
          {...props}
        />
      </>
    );

  return (
    <input
      hidden
      name={name}
      id={name}
      readOnly
      {...props}
    />
  );
}
