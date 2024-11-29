export function genStringLiteralVar(v: string) {
  return "${" + v + "}";
}
export function genStringLiteral(v: string) {
  return `\`${v}\``;
}
