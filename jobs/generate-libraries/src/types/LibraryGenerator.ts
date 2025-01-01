import { LibraryComponent } from "./LibraryComponent.js";

export interface LibraryGeneratorProps extends LibraryComponent {
  targetEnv: LibraryComponent["envs"][number];
}
