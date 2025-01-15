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
export const sampleTsComponentReact = `import { ComponentProps } from "react";
import styles from "./Button.module.scss";

interface Props extends ComponentProps<"button"> {
  variant?: "contained" | "outline" | "text"
}

export default function Button({ variant = "text", children, className, ...rest }: Props) {
  return (
    <button {...rest} className={\`\${styles.button} \${styles[variant]} \${className}\`}>
      {children}
    </button>
  );
}`;
