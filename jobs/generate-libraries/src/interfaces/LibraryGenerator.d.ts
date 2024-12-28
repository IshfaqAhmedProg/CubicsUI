import type { LibraryComponent } from "@cubicsui/db";

export interface LibraryGeneratorProps extends LibraryComponent {
  targetEnv: LibraryComponent["envs"][number];
}
