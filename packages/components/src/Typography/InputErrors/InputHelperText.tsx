import { type ElementType } from "react";
import type {
  UnionElementComponentType,
  UnionElementProps,
} from "@cubicsui/types";
import type { InputHelperTextBaseProps } from "./InputHelperText.types";

const defaultElements: ["p", "ul"] = ["p", "ul"];
type DefaultElements = (typeof defaultElements)[number];

export type InputHelperTextProps<C extends ElementType = DefaultElements> =
  UnionElementProps<C, InputHelperTextBaseProps>;

function InputHelperTextBase<C extends ElementType = DefaultElements>(
  props: InputHelperTextProps<C>,
) {
  const { text: _error, ...rest } =
    props as InputHelperTextProps<DefaultElements>;
  const error = _error?.length == 1 ? _error[0] : _error;
  if (!error || !error.length) return null;
  const isStringError = typeof error === "string";
  const Component = (isStringError ? "p" : "ul") as ElementType;
  const componentProps = { ...rest };
  return (
    <Component {...componentProps}>
      {isStringError
        ? error
        : error.map((c, i) => {
            return <li key={i}>{c}</li>;
          })}
    </Component>
  );
}

InputHelperTextBase.displayName = "InputHelperText";

/**
 * Use this when you want to render text that is of string or array of string type.
 * By default it renders a `<p>`, when a list is provided it will render a `<ul>` with each error inside an `<li>`.
 * ```tsx
 * <InputHelperText text={["text1","text2"]}>...</InputHelperText> // Renders `<ul>`
 * <InputHelperText text={["text1"]}>...</InputHelperText> // Renders <p>
 * <InputHelperText text={"text1"}>...</InputHelperText> // Renders <p>
 * ```
 */
export const InputHelperText = InputHelperTextBase as UnionElementComponentType<
  DefaultElements,
  InputHelperTextBaseProps
>;
