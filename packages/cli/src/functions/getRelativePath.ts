import path from "path";

/**
 *
 * @param fullpath Full path of the file in the users system
 * @param rootDir The root dir of the current project
 * @returns Relative path from root to filepath
 *
 * @example
 * const relativePath = getRelativePath("C:/../src/components/Avatar/Avatar.tsx","./src")
 * // returns "./components/Avatar/Avatar.tsx"
 */
export default function getRelativePath(
  fullpath: string,
  rootDir: string
): string {
  // Normalize the fullpath to handle different OS path separators
  const normalizedFullPath = path.normalize(fullpath);

  // Determine the root directory
  let rootDirectory = rootDir;
  if (rootDir === ".") {
    rootDirectory = process.cwd();
  }

  // Normalize the root directory path
  const normalizedRootDir = path.normalize(rootDirectory);

  // Get the relative path from the root directory to the full path
  const relativePath = path.relative(normalizedRootDir, normalizedFullPath);

  // Convert the relative path to a POSIX-style path (forward slashes)
  const posixRelativePath = relativePath.split(path.sep).join("/");

  // Ensure the path starts with a './'
  return posixRelativePath.startsWith("/")
    ? `.${posixRelativePath}`
    : `./${posixRelativePath}`;
}
