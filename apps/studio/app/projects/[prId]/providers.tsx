"use client";

import { Project } from "@/library/types/Library";
import { createContext, ReactNode, useContext } from "react";

export interface ProjectContextProps {
  project: Project;
}
export interface ProjectProviderProps extends ProjectContextProps {
  children: ReactNode;
}
const ProjectContext = createContext<ProjectContextProps | null>(null);

export function useProject() {
  const c = useContext(ProjectContext);
  if (!c) throw new Error("Components must be wrapped in <LibraryProvider/>");
  return c;
}

export default function ProjectProvider({
  children,
  project,
}: ProjectProviderProps) {
  return (
    <ProjectContext.Provider value={{ project }}>
      {children}
    </ProjectContext.Provider>
  );
}
