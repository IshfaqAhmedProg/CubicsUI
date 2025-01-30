export default function formatDate(
  date: Date | undefined | null,
  short?: boolean
): string {
  if (!date) return "N/A";
  return date.toLocaleDateString("en-US", {
    year: short ? "2-digit" : "numeric",
    day: "numeric",
    month: short ? "numeric" : "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
