import LPC from "@cubicsui/db/library-packages-catalog.json";

export type PackageFramework = keyof typeof LPC;
export type PackageName = keyof (typeof LPC)[PackageFramework];

export interface LibraryInterface {
  pkgName: PackageName;
  pkgFramework: PackageFramework;
}
