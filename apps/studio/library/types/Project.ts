import { configurations, projects } from "@cubicsui/db";

export type Project = projects;

export type ProjectWithConfigurations = projects & {
  configurations: configurations[];
};
