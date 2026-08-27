import { type ElementType } from "react";
import type {
  UnionElementComponentType,
  UnionElementProps,
} from "@cubicsui/types";
import type { TextOrListBaseProps } from "./TextOrList.types";

const defaultElements: ["p", "ul"] = ["p", "ul"];
type DefaultElements = (typeof defaultElements)[number];

export type TextOrListProps<C extends ElementType = DefaultElements> =
  UnionElementProps<C, TextOrListBaseProps>;

function TextOrListBase<C extends ElementType = DefaultElements>(
  props: TextOrListProps<C>,
) {
  const { text, ...rest } = props as TextOrListProps<DefaultElements>;
  const t = text?.length == 1 ? text[0] : text;
  if (!t || !t.length) return null;
  const isString = typeof t === "string";
  const Component = (isString ? "p" : "ul") as ElementType;
  const componentProps = { ...rest };
  return (
    <Component {...componentProps}>
      {isString
        ? t
        : t.map((c, i) => {
            return <li key={i}>{c}</li>;
          })}
    </Component>
  );
}

TextOrListBase.displayName = "InputHelperText";

/**
 * Use this when you want to render text that is of string or array of string type.
 * By default it renders a `<p>`, when a list is provided it will render a `<ul>` with each error inside an `<li>`.
 * ```tsx
 * <InputHelperText text={["text1","text2"]}>...</InputHelperText> // Renders `<ul>`
 * <InputHelperText text={["text1"]}>...</InputHelperText> // Renders <p>
 * <InputHelperText text={"text1"}>...</InputHelperText> // Renders <p>
 * ```
 */
export const TextOrList = TextOrListBase as UnionElementComponentType<
  DefaultElements,
  TextOrListBaseProps
>;
