export const samplePkgJson = (name: string = "") => `{
  "name": "${name}",
  "version": "1.0.0",
  "description": "",
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
