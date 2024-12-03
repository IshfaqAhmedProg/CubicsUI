import LPC from "@cubicsui/db/library-packages-catalog.json";
import { LibraryInterface } from "../interfaces/Library";
// import { ComponentName, Framework } from "..";

// type LibraryPackageManifestType = {
//   [key in ComponentName]: { description: string };
// };

// export const libraryPackagesManifest: LibraryPackageManifestType = {
//   button: {
//     description: "This is a button",
//   },
//   iconbutton: {
//     description: "This is an icon button",
//   },
// };

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
  minify: true,
};

export function initialiseLibraryPackage({
  pkgName,
  pkgFramework,
}: LibraryInterface) {
  return {
    name: `@cubicsui/${pkgFramework}-${pkgName}`,
    description: LPC[pkgFramework][pkgName].description,
    version: "0.0.0",
    ...{ tsup },
    scripts: {
      build: `tsup`,
    },
    ...{ peerDependencies },
    ...{ devDependencies },
  };
}
