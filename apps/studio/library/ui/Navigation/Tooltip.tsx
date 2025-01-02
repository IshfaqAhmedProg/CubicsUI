import { Tooltip as MuiTooltip, TooltipProps } from "@mui/material";
import React from "react";

/**
 * Extended Mui tooltip to include a renderTooltip prop which allows conditional rendering of the tooltip.
 * This is not the same as https://mui.com/material-ui/react-tooltip/#controlled-tooltips
 * Controlled tooltips allow you to control the tooltips open state, instead of controlling the rendering.
 * @param props
 * @returns
 */
export default function Tooltip(
  props: {
    renderTooltip?: boolean;
  } & TooltipProps
) {
  const { renderTooltip = true, children, ...rest } = props;

  if (!renderTooltip) return children;

  return <MuiTooltip {...rest}>{children}</MuiTooltip>;
}
