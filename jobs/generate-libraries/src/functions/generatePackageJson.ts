import type { PackageJson } from "type-fest";
import { LibraryGeneratorProps } from "../types/LibraryGenerator.js";

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

export default function generatePackageJson({
  targetEnv,
  ...component
}: LibraryGeneratorProps): PackageJson {
  return {
    name: `@cubicsui/${targetEnv}-${component.name}`,
    description: component.description,
    version: "0.0.0",
    ...{ tsup },
    scripts: {
      build: `tsup`,
    },
    ...{ peerDependencies },
    ...{ devDependencies },
  };
}
