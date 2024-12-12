import type { Component } from "@cubicsui/db";

export interface LibraryGeneratorProps extends Component {
  targetEnv: Component["envs"][number];
}
