"use client";
import useMousePosition from "@/library/hooks/useMousePosition";
import styles from "./Cursor.module.scss";
function scale(
  number: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  const result =
    ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  return result;
}
function calculateScale(value: number, mouseSpeed: number) {
  return value - Math.round(scale(mouseSpeed, 33, 1000, 0, 100));
}
export default function Cursor() {
  const { mousePosition, touchPosition, mouseSpeed } = useMousePosition({
    includeTouch: true,
  });

  return (
    <div className={styles.cursorContainer}>
      <div
        className={styles.cursor}
        style={{
          left: `${mousePosition.x ?? touchPosition.x}px`,
          top: `${mousePosition.y ?? touchPosition.y}px`,
          width: `${calculateScale(33.75, mouseSpeed)}em`,
          height: `${calculateScale(24, mouseSpeed)}em`,
        }}
      >
        ${mousePosition.x} ${mousePosition.y} ${touchPosition.x} $
        {touchPosition.y} ${mouseSpeed}
      </div>
    </div>
  );
}