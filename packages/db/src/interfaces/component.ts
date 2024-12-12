export type ComponentCategory = "components" | "hooks" | "misc";
export type ComponentTargetEnv = "react" | "svelte" | "next";
export type ComponentStyleEngine = "css" | "scss" | "tailwind";

export type Component = {
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
  category: ComponentCategory;
  /**
   * Environments that are supported by the component
   */
  envs: ComponentTargetEnv[];
  /**
   * A package will be created in library for these packages
   */
  pkgEnv: ComponentTargetEnv[];
  /**
   * This is the style engine that is associated with the project and its value is derived from cui.config
   */
  styleEngine?: ComponentStyleEngine;
};
