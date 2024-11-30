export type GenComponentBase = {
  fileName?: string;
  componentName?: string;
  stylesName?: string;
  mode?: "typescript" | "javascript";
  styleEngine?: "css" | "scss" | "tailwind";
};

export type GenReactButtonProps = {} & GenComponentBase;

export type KVBase = {
  key: string;
  value?: string;
  [key: string]: any;
};
