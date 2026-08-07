import type { ComponentProps } from "react";

export function DashIconAnimated(props: ComponentProps<"svg">) {
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
      className="lucide dash-animate"
    >
      <path d="M5 12h14" pathLength={1} />
    </svg>
  );
}
