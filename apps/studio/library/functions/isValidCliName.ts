/**
 * Checks if a given string is a valid and safe name for CLI usage.
 */
const isValidCliName = /^[a-zA-Z0-9]([a-zA-Z0-9-_]{0,13}[a-zA-Z0-9])?$/;
export default isValidCliName;
