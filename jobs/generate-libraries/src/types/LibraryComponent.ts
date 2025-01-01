export type LibraryComponentCategory = "components" | "hooks" | "misc";
export type LibraryComponentTargetEnv = "react" | "svelte" | "next";
export type LibraryComponentStyleEngine = "css" | "scss" | "tailwind";

export type LibraryComponent = {
  /**
   * A unique identifier for the component
   */
  id: string;
  /**
   * The default name of the component.
   */
  name: string;
  /**
   * Description of the component. This is also used as the description of the package.json created for the library package
   */
  description: string;
  /**
   * Aliases are used to improve ux so that users can create components with an alias of the component instead of the name directly:
   *
   * @example```
   * To create a button you can use
   * `cui create button`
   * or
   * `cui create btn`
   * ```
   */
  aliases: string[];
  /**
   * The components are split into categories to help with organisation
   */
  category: LibraryComponentCategory;
  /**
   * Environments that are supported by the component
   */
  envs: LibraryComponentTargetEnv[];
  /**
   * A package will be created in library for these packages
   */
  pkgEnv: LibraryComponentTargetEnv[];
  /**
   * This is the style engine that is associated with the project and its value is derived from cui.config
   */
  styleEngine?: LibraryComponentStyleEngine;
};
