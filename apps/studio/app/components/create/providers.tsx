"use client";

import { sampleTsComponentReact } from "@/library/constants/sampleCodeBlocks";
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
function useComponentFormStates() {
  const [name, setName] = useState("Accordion");
  const [desc, setDesc] = useState("");
  const [outFile, setOutFile] = useState("Accordion.tsx");
  const [outDir, setOutDir] = useState("Accordion");
  const [tags, setTags] = useState<string[]>([]);
  const [deps, setDeps] = useState<Dependencies>({ ext: [], lcl: [] });
  const [scriptCode, setScriptCode] = useState<string | undefined>(
    sampleTsComponentReact
  );
  const [styleCode, setStyleCode] = useState<string | undefined>();
  const [scriptIncludesStyles, setScriptIncludesStyles] = useState(false);

  function analyseDependencies() {
    const newDeps = analyzeCodeDependencies(scriptCode, { "@/*": ["./*"] });
    if (newDeps.ext.length !== 0 || newDeps.lcl.length !== 0) {
      setDeps(newDeps);
    }
    console.log("newDeps", newDeps);
  }

  return {
    name,
    desc,
    outFile,
    outDir,
    tags,
    deps,
    scriptCode,
    styleCode,
    scriptIncludesStyles,
    setName,
    setDesc,
    setOutFile,
    setOutDir,
    setTags,
    setDeps,
    setScriptCode,
    setStyleCode,
    setScriptIncludesStyles,
    analyseDependencies,
  };
}
