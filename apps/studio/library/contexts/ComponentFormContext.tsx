"use client";

import {
  sampleCssModule,
  sampleJsComponentReact,
  sampleSassModule,
  sampleTsComponentReact,
} from "@/library/constants/sampleCodeBlocks";
import { codeblocks, components, Dependencies, libraries } from "@cubicsui/db";
import {
  createContext,
  ReactNode,
  useActionState,
  useContext,
  useState,
} from "react";
import { saveComponentAction } from "@/app/components/actions";

interface ComponentFormDefaultStateProps {
  library: libraries;
  component?: components | null;
  codeblocks?: codeblocks | null;
}

interface ComponentFormContextProps
  extends ReturnType<typeof useComponentFormStates>,
    ComponentFormDefaultStateProps {}

interface ComponentFormProviderProps extends ComponentFormDefaultStateProps {
  children: ReactNode;
}

const ComponentFormContext = createContext<ComponentFormContextProps | null>(
  null
);

export function useComponentForm() {
  const c = useContext(ComponentFormContext);
  if (!c)
    throw new Error("Components must be wrapped in <ComponentFormProvider/>");
  return c;
}

export default function ComponentFormProvider({
  children,
  ...defaults
}: ComponentFormProviderProps) {
  const componentFormState = useComponentFormStates(defaults);
  // { "@/*": ["./*"] }
  return (
    <ComponentFormContext.Provider
      value={{ ...componentFormState, ...defaults }}
    >
      {children}
    </ComponentFormContext.Provider>
  );
}
function useComponentFormStates({
  library,
  codeblocks,
  component,
}: ComponentFormDefaultStateProps) {
  const [name, setName] = useState(component?.name ?? "");
  const [desc, setDesc] = useState(component?.desc ?? "");
  const [outPath, setOutPath] = useState(component?.outPath ?? "./components/");
  const [tags, setTags] = useState<string[]>(component?.tags ?? []);
  const [deps, setDeps] = useState<Dependencies>(
    component?.deps ?? { ext: [], lcl: [] }
  );
  const initialsScriptCode = codeblocks?.script
    ? codeblocks.script
    : library.lang == "typescript"
      ? sampleTsComponentReact
      : sampleJsComponentReact;

  const [scriptCode, setScriptCode] = useState<string | undefined>(
    initialsScriptCode
  );
  const initialStyleCode = codeblocks?.styles
    ? codeblocks.styles
    : library.styleExt == "scss"
      ? sampleSassModule
      : sampleCssModule;

  const [styleCode, setStyleCode] = useState<string | undefined>(
    initialStyleCode
  );
  const [scriptIncludesStyles, setScriptIncludesStyles] = useState(
    !!codeblocks?.styles
  );

  const [formState, formAction, formPending] = useActionState(
    saveComponentAction,
    {}
  );

  return {
    name,
    desc,
    outPath,
    tags,
    deps,
    scriptCode,
    styleCode,
    scriptIncludesStyles,
    formState,
    formPending,
    setName,
    setDesc,
    setOutPath,
    setTags,
    setDeps,
    setScriptCode,
    setStyleCode,
    setScriptIncludesStyles,
    formAction,
  };
}
