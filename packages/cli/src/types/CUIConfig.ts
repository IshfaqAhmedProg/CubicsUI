/**
 * The supported naming conventions
 */
export type NamingConvention =
  | "CapitalCase"
  | "camelCase"
  | "kebab-case"
  | "snake_case"
  | "UPPERCASE";
/**
 * The environment configuration object for the host project
 */
export type Environment = {
  library: string;
  framework?: string;
};
/**
 * Comprehensive configuration interface for the CubicsUI CLI.
 *
 * @description
 * Represents the full configuration schema that controls component generation and project setup.
 * This configuration allows fine-grained control over code generation, style management,
 * and project-specific preferences.
 *
 * @see {@link DetectedConfig} for automatically detected configuration subset
 * @see {@link configFiles} for supported configuration file names
 *
 * @example
 * // Example of a complete CUI configuration
 * const config: CUIConfig = {
 *  env: { library: "react", framework: "none" },
 *  styleEngine: "css",
 *  typescript: false,
 *  srcFolder: false,
 *  renderComments: "none",
 * };
 */

export type CUIConfig = {
  envOptions: {
    /**
     * The generated code for the components depends on the `env` object is selected
     * @remarks
     * This will be detected when you run
     * `cui init`
     */
    env: Environment;
    /**
     * Controls which flavor of css should be used when generating styles for the components,
     * - `css` (default)
     * - `tailwind`: If any `tailwind.config` file is detected in the project root
     * - `scss`: If any `.scss` file is detected anywhere in the project.
     * @remarks
     * This will be automatically detected when you run
     * `cui init`
     * @default "css"
     */
    styleExt: "css" | "scss" | "tailwind";

    /**
     * Set to true if the generated components should use typescript,
     *
     * @remarks
     * This will be detected when you run
     * `cui init`
     */
    typescript: boolean;
    /**
     * Controls wether the root directory is in src or process.cwd()
     *
     * @remarks
     * This will be detected when you run
     * `cui init`
     */
    rootDir: string;
    /**
     * Controls the rendering of comments during component generation.
     * - `all` (default): Renders all comments, including detailed and minor explanations.
     * - `none`: Suppresses all comments during component generation.
     * - `important`: Renders only necessary or critical comments that provide essential context.
     * @default "none"
     */
    // renderComments?: "none" | "all" | "important";
    /**
     * Controls the naming convention for the files of the generated component
     * - `CapitalCase`(default): File names will be in capital case eg:- TimeCard.tsx
     * - `camelCase`: File names will be in camel case eg:- timeCard.tsx
     * - `kebab-case`: Files will be in kebab case eg:- time-card.tsx
     * - `snake_case`: Files will be in snake case eg:- time_card.tsx
     * - `UPPERCASE`: Files will be in snake case eg:- TIMECARD.tsx
     * @default "CapitalCase"
     */
    // fileNamingConvention: NamingConvention;
    /**
     * Controls the naming convention for the folders that will contain the generated component
     * - `CapitalCase`(default): File names will be in capital case eg:- TimeCard
     * - `camelCase`: File names will be in camel case eg:- timeCard
     * - `kebab-case`: Files will be in kebab case eg:- time-card
     * - `snake_case`: Files will be in snake case eg:- time_card
     * - `UPPERCASE`: Files will be in snake case eg:- TIMECARD
     * @default "CapitalCase"
     */
    // dirNamingConvention: NamingConvention;
  };
  databaseOptions: {
    /**
     * Name of the library in the database where the components can be found
     */
    libraryName: string;
  };
  mods?: [];
};

/**
 * Subset of CUIConfig representing configuration parameters that can be automatically
 * detected from the project's existing structure and setup.
 *
 * @description
 * Provides a focused view of the most fundamental configuration parameters that
 * can be inferred without explicit user configuration. This type is derived from
 * the main CUIConfig interface, extracting only the key auto-detectable properties.
 *
 * @remarks
 * - Represents the minimum viable configuration information
 *
 * @see CUIConfig for the complete configuration interface
 */
export type DetectedConfig = Pick<CUIConfig, "envOptions">;
/**
 * A type that represents the literal string types of valid configuration file names.
 *
 * Allows precise type checking and autocompletion for configuration file names throughout the application.
 *
 * @typeparam ConfigFile - A union type of the specific configuration file name strings
 */
export type ConfigFile = "cui.config.mjs" | "cui.config.ts";
