export type TextOrListBaseProps = {
  /** String or array of strings, will render a `<ul/>` with the strings in `<li/>` if text is array of strings*/
  text?: string | string[];
  /** Children are not allowed */
  children?: null;
};
