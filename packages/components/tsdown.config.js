import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  sourcemap: true,
  clean: false,
  dts: true,
  minify: true,
  treeshake: true,
  unbundle: true,
  css: {
    splitting: true,
    inject: true,
    modules: false,
  },
  deps: {
    neverBundle: [
      "react/jsx-runtime",
      "react",
      "react-dom",
      "@types/react",
      "@types/react-dom",
      "@studiocubics/utils",
      "@studiocubics/hooks",
    ],
  },
});
