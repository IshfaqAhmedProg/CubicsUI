import { Library } from "../types/Library";

export const samplePkgJson = (library?: Library) => `{
  "name": "${library?.name ?? "libraryName"}",
  "version": "1.0.0",
  "description": "${library?.desc ?? ""}",
  "author": "",
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {}
}
`;
export const sampleTsconfig = `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;
