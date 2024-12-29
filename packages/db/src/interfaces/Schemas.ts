import { Component } from "./Component.js";
import type { LibraryComponent } from "./LibraryComponent.js";

export type LibraryComponentsDBSchema = {
  components: LibraryComponent[];
};
export type ComponentsDBSchema = {
  components: Component[];
};
