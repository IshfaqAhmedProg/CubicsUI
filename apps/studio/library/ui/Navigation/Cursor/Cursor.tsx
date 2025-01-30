"use client";
import useMousePosition from "@/library/hooks/useMousePosition";
import styles from "./Cursor.module.scss";
/**
 * Converts a number from one range to another
 * @param number Number to convert
 * @param fromMin 
 * @param fromMax 
 * @param toMin 
 * @param toMax 
 * @returns 
 */
function scale(
  number: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
) {
  const result =
    ((number - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
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
