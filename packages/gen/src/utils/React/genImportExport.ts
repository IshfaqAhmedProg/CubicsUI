// Define a type for all React named exports
export type ReactNamedExport =
  // Hooks
  | "useState"
  | "useEffect"
  | "useContext"
  | "useReducer"
  | "useCallback"
  | "useMemo"
  | "useRef"
  | "useImperativeHandle"
  | "useLayoutEffect"
  | "useDebugValue"

  // Suspense and Concurrent Mode
  | "Suspense"
  | "lazy"
  | "startTransition"

  // Component Utilities
  | "memo"
  | "forwardRef"
  | "createContext"
  // Other Utilities
  | "Children"
  | "Fragment";

export type ReactTypeExport = "ComponentPropsWithoutRef" | "ReactNode";

export const genReactModularImports = (
  modulesAsString: ReactNamedExport[],
  withDefault?: boolean
) => {
  return `import ${withDefault ? "React," : ""} { ${modulesAsString.join(", ")} } from 'react';`;
};
export const genReactTypeImports = (modulesAsString: ReactTypeExport[]) => {
  return `import type { ${modulesAsString.join(", ")} } from 'react';`;
};

export const genStyleModuleImport = (filePath: string, styleName: string) =>
  `import ${styleName} from "${filePath}";`;

export const genDefaultExport = (name: string) => `export default ${name};`;
