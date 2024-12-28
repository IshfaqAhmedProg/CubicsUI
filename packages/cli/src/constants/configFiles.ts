import type { ConfigFile } from "@cubicsui/db";

/**
 * Defines an array of recognized configuration file names for the CubicsUI configuration system.
 *
 * This constant array contains the standard filenames that the configuration loader will search for when
 * attempting to locate and parse the application's configuration. Currently supports both JavaScript and
 * TypeScript configuration file formats.
 *
 * @remarks
 * - The configuration files are expected to be located in the project's root directory
 * - Supports `.js` and `.ts` extensions for maximum flexibility across different project setups
 *
 * @see {@link ConfigFile} for the type derived from this array
 */
const configFiles: ConfigFile[] = ["cui.config.mjs", "cui.config.ts"];
export default configFiles;
