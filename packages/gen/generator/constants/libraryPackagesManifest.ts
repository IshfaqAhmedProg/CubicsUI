import { ComponentName, Framework } from "../functions/generateLibraries";

export const libPkgScripts = {
  build: "tsup",
};
export const libPkgDevDeps = {
  tsup: "^8.3.5",
};
export const libPkgPeerDeps = {
  react: "^18",
};
export function initialiseLibraryPackage(
  componentName: ComponentName,
  framework: Framework
) {
  return {
    name: `@cubicsui/${framework}-${componentName}`,
    ...libraryPackagesManifest[componentName],
    version: "0.0.0",
    scripts: { ...libPkgScripts },
    peerDependecies: { ...libPkgPeerDeps },
    devDependencies: { ...libPkgDevDeps },
  };
}

type LibraryPackageManifestType = {
  [key in ComponentName]: { description: string };
};

export const libraryPackagesManifest: LibraryPackageManifestType = {
  button: {
    description:
      "The main generator that builds the components, hooks and styles, based on what you need",
  },
};
