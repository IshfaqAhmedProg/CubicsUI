import type { ComponentProps } from "react";

export function CheckIconAnimated(props: ComponentProps<"svg">) {
  const { width = 24, height = width, ...rest } = props;
  return (
    <svg
      fill="none"
      stroke="currentColor"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className="lucide check-animate"
    >
      <path d="M5 13 9 17l10 -9" pathLength={1} />
    </svg>
  );
}
