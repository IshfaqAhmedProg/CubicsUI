import type { PositionString } from "@cubicsui/types";

type VerticalOrigin = "top" | "center" | "bottom";
type HorizontalOrigin = "left" | "center" | "right";

interface ParsedOrigin {
  vertical: VerticalOrigin;
  horizontal: HorizontalOrigin;
}

export interface SafePositionOptions {
  anchorOrigin?: PositionString;
  transformOrigin?: PositionString;
  margin?: number;
}

export interface Position {
  x: number;
  y: number;
}

/**
 * Calculates safe position of an element within viewport relative to an anchor element
 * Works like Material UI Popover positioning:
 * - anchorOrigin: point on the anchor element (e.g., "top center" = top-center of anchor)
 * - transformOrigin: point on the positioned element that attaches to anchor (e.g., "bottom center" = bottom-center of popup attaches to anchor point)
 *
 * Example: anchorOrigin "top center" + transformOrigin "bottom center" positions popup above and centered
 *
 * @param element - The element to position
 * @param anchorElement - The anchor element to position relative to
 * @param options - Configuration options
 * @returns Safe x, y coordinates
 */
export function calculateSafePosition(
  element: HTMLElement | null,
  anchorElement: HTMLElement | null,
  options: SafePositionOptions = {},
): Position {
  const {
    anchorOrigin = "bottom center",
    transformOrigin = "top center",
    margin = 0,
  } = options;

  if (!element || !anchorElement) return { x: 0, y: 0 };

  const elementRect = element.getBoundingClientRect();
  const anchorRect = anchorElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const anchor = parseOrigin(anchorOrigin);
  const transform = parseOrigin(transformOrigin);

  // Calculate anchor point on the anchor element
  const anchorX =
    anchorRect.left + getAnchorOffset(anchorRect.width, anchor.horizontal);
  const anchorY =
    anchorRect.top + getAnchorOffset(anchorRect.height, anchor.vertical);

  // Calculate where on the element we're attaching (transform origin point)
  const elementOriginX = getTransformOffset(
    elementRect.width,
    transform.horizontal,
  );
  const elementOriginY = getTransformOffset(
    elementRect.height,
    transform.vertical,
  );

  // Position the element so its transform origin aligns with the anchor point
  let x = anchorX - elementOriginX;
  let y = anchorY - elementOriginY;

  // Check and adjust for viewport boundaries with margin
  // Right boundary
  if (x + elementRect.width > viewportWidth - margin) {
    x = viewportWidth - elementRect.width - margin;
  }
  // Left boundary
  if (x < margin) {
    x = margin;
  }

  // Bottom boundary
  if (y + elementRect.height > viewportHeight - margin) {
    y = viewportHeight - elementRect.height - margin;
  }
  // Top boundary
  if (y < margin) {
    y = margin;
  }

  return { x: Math.max(margin, x), y: Math.max(margin, y) };
}

function parseOrigin(origin: string): ParsedOrigin {
  const parts = origin.toLowerCase().trim().split(/\s+/);
  let vertical: VerticalOrigin = "top";
  let horizontal: HorizontalOrigin = "left";

  for (const part of parts) {
    if (["top", "bottom"].includes(part)) vertical = part as VerticalOrigin;
    else if (["left", "right"].includes(part))
      horizontal = part as HorizontalOrigin;
    else if (part === "center") {
      // Assign center depending on position in string
      if (parts.length === 1) {
        vertical = "center";
        horizontal = "center";
      } else if (["top", "bottom"].includes(parts[0])) horizontal = "center";
      else vertical = "center";
    }
  }

  return { vertical, horizontal };
}

function getAnchorOffset(
  size: number,
  origin: VerticalOrigin | HorizontalOrigin,
): number {
  if (origin === "center") return size / 2;
  if (origin === "bottom" || origin === "right") return size;
  return 0; // top or left
}

function getTransformOffset(
  size: number,
  origin: VerticalOrigin | HorizontalOrigin,
): number {
  if (origin === "center") return size / 2;
  if (origin === "bottom" || origin === "right") return size;
  return 0; // top or left
}
