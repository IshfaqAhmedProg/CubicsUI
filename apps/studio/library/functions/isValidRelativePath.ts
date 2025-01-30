/**
 * File names reserved in windows systems
 */
export const reservedFileNames = [
  "CON",
  "PRN",
  "AUX",
  "NUL",
  "COM1",
  "COM2",
  "COM3",
  "COM4",
  "COM5",
  "COM6",
  "COM7",
  "COM8",
  "COM9",
  "LPT1",
  "LPT2",
  "LPT3",
  "LPT4",
  "LPT5",
  "LPT6",
  "LPT7",
  "LPT8",
  "LPT9",
];

/**
 * Regular expression to validate relative file paths
 */
export const relativePathRegex = /^\.{1,2}(\/[^\/\0]+)+$/;

/**
 * Checks if a given string is a valid relative file path and avoids reserved file names.
 * @param path - The string to check.
 * @returns `true` if the string is a valid relative file path and not reserved, otherwise `false`.
 */
export default function isValidRelativePath(path: string): boolean {
  // List of reserved file names on Windows (case-insensitive)

  // Check if the string matches the regex for relative paths
  if (!relativePathRegex.test(path)) {
    return false;
  }

  // Extract the last segment of the path (file or folder name)
  const segments = path.split("/");
  const lastSegment = segments[segments.length - 1];

  // Check if the last segment matches any reserved file name (case-insensitive)
  const isReserved = reservedFileNames.some(
    (reserved) => reserved.toLowerCase() === lastSegment.toLowerCase()
  );

  return !isReserved;
}
