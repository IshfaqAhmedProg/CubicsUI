import { Dependencies, TargetEnvs } from "@cubicsui/db";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ComponentFormContextProps {}
interface ComponentFormProviderProps {
  children: ReactNode;
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
}: ComponentFormProviderProps) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [outPath, setOutPath] = useState("");
  const [tags, setTags] = useState([]);
  const [targetEnvs, setTargetEnvs] = useState<TargetEnvs>({
    lib: "",
    fw: "",
  });
  const [deps, setDeps] = useState<Dependencies>({ ext: [], lcl: [] });

  return (
    <ComponentFormContext.Provider value={{}}>
      {children}
    </ComponentFormContext.Provider>
  );
}
