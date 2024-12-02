import { ComponentName, Framework } from "..";

type LibraryPackageManifestType = {
  [key in ComponentName]: { description: string };
};

export const libraryPackagesManifest: LibraryPackageManifestType = {
  button: {
    description: "This is a button",
  },
  iconbutton: {
    description: "This is an icon button",
  },
};

export const devDependencies = {
  tsup: "^8.3.5",
  "@types/react": "^18.3.12",
};
export const peerDependencies = {
  react: "^18.3.1",
};
export const tsup = {
  entry: ["src/index.tsx"],
  splitting: false,
  sourcemap: true,
  clean: true,
};

export function initialiseLibraryPackage(
  componentName: ComponentName,
  framework: Framework
) {
  return {
    name: `@cubicsui/${framework}-${componentName}`,
    ...libraryPackagesManifest[componentName],
    version: "0.0.0",
    ...{ tsup },
    scripts: {
      build: `tsup`,
    },
    ...{ peerDependencies },
    ...{ devDependencies },
  };
}
