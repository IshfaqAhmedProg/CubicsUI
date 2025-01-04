export const npmPackageNameRegex =
  /^(?:@([a-z0-9-]+)\/)?[a-z0-9][a-z0-9-.]*[a-z0-9]$/;

export default function parsePackageNameVersion(input: string) {
  // TODO Update tsconfig target to es2023 to support capture groups
  const packageNameVersionRegex = /^(?:@([^@]+)\/)?([^@]+)(?:@(.+))?$/; // Regex for scoped and unscoped package names
  const match = input.match(packageNameVersionRegex);

  if (!match) {
    throw new Error("Invalid package string");
  }

  const scope = match[1] ? `@${match[1]}/` : ""; // Reconstruct scope if present
  const packageName = scope + match[2]; // Full package name including scope if applicable
  const version = match[3] || null; // Version is optional

  return {
    packageName: packageName,
    version: version,
  };
}
