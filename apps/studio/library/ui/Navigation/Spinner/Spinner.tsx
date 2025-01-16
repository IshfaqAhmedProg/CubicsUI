import { CSSProperties } from "react";
import styles from "./Spinner.module.scss";

interface LoadingIconProps {
  size?: number;
  fill?: CSSProperties["fill"];
  /** Needs `position: relative` on the container to work */
  centered?: boolean;
}

export default function Spinner({
  size = 16,
  fill = "var(--palette-primary-main)",
  centered = false,
}: LoadingIconProps) {
  return (
    <div className={`${styles.container} ${centered ? styles.centered : ""}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className={styles.spinner}
          x="1"
          y="1"
          rx="1"
          width="10"
          height="10"
          fill={fill}
        />
        <rect
          className={`${styles.spinner} ${styles.spinner_trailing}`}
          x="1"
          y="1"
          rx="1"
          width="10"
          height="10"
          fill={fill}
          fillOpacity={0.5}
        />
      </svg>
    </div>
  );
}
