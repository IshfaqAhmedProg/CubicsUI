import generateLibraries from "./functions/generateLibraries";

export const COMPONENTS = ["button", "iconbutton"] as const;
export const FRAMEWORKS = ["react", "svelte", "next"] as const;

export type ComponentName = (typeof COMPONENTS)[number];
export type Framework = (typeof FRAMEWORKS)[number];

for (let index = 0; index < FRAMEWORKS.length; index++) {
  const fw = FRAMEWORKS[index];
  for (let index = 0; index < COMPONENTS.length; index++) {
    const cmp = COMPONENTS[index];
    generateLibraries(cmp, fw);
  }
}
