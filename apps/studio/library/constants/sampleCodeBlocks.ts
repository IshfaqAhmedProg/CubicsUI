import { Project } from "../types/Library";

export const samplePkgJson = (project?: Project) => `{
  "name": "${project?.name ?? "projectName"}",
  "version": "1.0.0",
  "description": "${project?.desc ?? ""}",
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
