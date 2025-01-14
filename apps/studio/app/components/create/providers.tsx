"use client";

import { analyzeCodeDependencies } from "@/library/functions/dependencyAnalyser";
import { Dependencies, projects } from "@cubicsui/db";
import { createContext, ReactNode, useContext, useState } from "react";

interface ComponentFormContextProps
  extends ReturnType<typeof useComponentFormStates> {
  project: projects;
}
interface ComponentFormProviderProps {
  children: ReactNode;
  project: projects;
}

export const ComponentFormContext =
  createContext<ComponentFormContextProps | null>(null);

export function useComponentForm() {
  const c = useContext(ComponentFormContext);
  if (!c)
    throw new Error("Components must be wrapped in <ComponentFormProvider/>");
  return c;
}

export default function ComponentFormProvider({
  children,
  project,
}: ComponentFormProviderProps) {
  const componentFormState = useComponentFormStates();
  // { "@/*": ["./*"] }
  return (
    <ComponentFormContext.Provider value={{ ...componentFormState, project }}>
      {children}
    </ComponentFormContext.Provider>
  );
}
export function useComponentFormStates() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [outPath, setOutPath] = useState("");
  const [tags, setTags] = useState([]);
  const [deps, setDeps] = useState<Dependencies>({ ext: [], lcl: [] });
  const [scriptCode, setScriptCode] = useState<string | undefined>();
  const [styleCode, setStyleCode] = useState<string | undefined>();

  const [dependenciesAnalysed, setDependenciesAnalysed] = useState(false);

  function analyseDependencies() {
    const newDeps = analyzeCodeDependencies(scriptCode, { "@/*": ["./*"] });
    if (newDeps.ext.length !== 0 || newDeps.lcl.length !== 0) {
      setDependenciesAnalysed(true);
      setDeps(newDeps);
    }
    console.log("newDeps", newDeps);
  }

  return {
    name,
    desc,
    outPath,
    tags,
    deps,
    scriptCode,
    styleCode,
    dependenciesAnalysed,
    setName,
    setDesc,
    setOutPath,
    setTags,
    setDeps,
    setScriptCode,
    setStyleCode,
    setDependenciesAnalysed,
    analyseDependencies,
  };
}
