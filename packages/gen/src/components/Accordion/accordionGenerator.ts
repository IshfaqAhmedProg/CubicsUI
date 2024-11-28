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

export const reactModularImports = (modulesAsString: ReactNamedExport[]) => {
  return `import { ${modulesAsString.join(", ")} } from 'react';`;
};

export const withStylesImport = (filePath: string) =>
  `import styles from "${filePath}";`;
