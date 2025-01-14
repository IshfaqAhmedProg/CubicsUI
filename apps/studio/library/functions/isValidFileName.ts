export function filenameReservedRegex() {
  return /[<>:"/\\|?*\u0000-\u001F]/g;
}
export function windowsReservedNameRegex() {
  return /^(con|prn|aux|nul|com\d|lpt\d)$/i;
}
const validFileExtensions = [".js", ".ts", ".jsx", ".tsx"];

export default function isValidFilename(string: string) {
  if (!string || string.length > 255) {
    return false;
  }

  if (
    filenameReservedRegex().test(string) ||
    windowsReservedNameRegex().test(string)
  ) {
    return false;
  }

  if (!validFileExtensions.some((v) => string.endsWith(v))) {
    return false;
  }
  if (string === "." || string === "..") {
    return false;
  }

  return true;
}
