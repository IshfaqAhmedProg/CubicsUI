import { Children } from "react";

export function extractInnerHTML(children: React.ReactNode): string {
  return Children.toArray(children)
    .map((child) => (typeof child === "string" ? child : ""))
    .join("");
}
