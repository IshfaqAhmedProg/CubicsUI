import { configurations, libraries } from "@cubicsui/db";

export type Library = libraries;

export type LibraryWithConfigurations = libraries & {
  configurations: configurations[];
};
