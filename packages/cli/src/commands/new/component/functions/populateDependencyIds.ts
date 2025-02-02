import { CUIConfig } from "@/types/CUIConfig.js";
import resolveAliasedPath from "@/utils/resolveAliasedPath.js";
import { LocalDependency, projects } from "@cubicsui/db";
import { TsConfigPaths } from "@cubicsui/helpers";
import uploadComponentTree from "./uploadComponentTree.js";

interface PopulateDependencyIdProps {
  localDeps: LocalDependency[];
  project: projects;
  config: CUIConfig;
  pathAliases?: TsConfigPaths;
  styleModule?: string;
}

/**
 * Populates the local dependency ids by checking if it is a style module or if not then creates the components and populates the ids.
 * @returns
 */
export default async function populateDependencyIds({
  localDeps,
  project,
  config,
  pathAliases,
  styleModule,
}: PopulateDependencyIdProps) {
  // traverse and create lcl deps if it doesnt exist and link the ids
  for (const dep of localDeps) {
    if (dep.name == styleModule) {
      dep.cmpId = "styles";
    } else {
      const depPath = resolveAliasedPath(
        dep.name,
        config.envOptions.rootDir,
        pathAliases
      );
      console.log("depPath", depPath);
      dep.cmpId =
        (await uploadComponentTree(project, depPath, config))?.id ?? "";
    }
  }
  return localDeps;
}
