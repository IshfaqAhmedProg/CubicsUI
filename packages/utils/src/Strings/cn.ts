export function cn(
  ...classNames: (string | undefined | null)[]
): string | undefined {
  const filtered = classNames.filter(Boolean);
  if (!filtered.length) return undefined;
  return filtered.join(" ");
}
