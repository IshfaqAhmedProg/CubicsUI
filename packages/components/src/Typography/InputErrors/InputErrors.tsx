import { type ElementType } from "react";
import styles from "./InputErrors.module.css";
import { cn } from "@cubicsui/utils";
import type {
  UnionElementComponentType,
  UnionElementProps,
} from "@cubicsui/types";
import type { InputErrorsBaseProps } from "./InputErrors.types";

const defaultElements: ["p", "ul"] = ["p", "ul"];
type DefaultElements = (typeof defaultElements)[number];

export type InputErrorsProps<C extends ElementType = DefaultElements> =
  UnionElementProps<C, InputErrorsBaseProps>;

function InputErrorsBase<C extends ElementType = DefaultElements>(
  props: InputErrorsProps<C>,
) {
  const {
    error: _error,
    className,
    ...rest
  } = props as InputErrorsProps<DefaultElements>;
  const error = _error?.length == 1 ? _error[0] : _error;
  if (!error || !error.length) return null;
  const isStringError = typeof error === "string";
  const Component = (isStringError ? "p" : "ul") as ElementType;
  const componentProps = { className: cn(className, styles.root), ...rest };
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

InputErrorsBase.displayName = "InputErrors";

/**
 * Use this when you want to render errors that is of string or array of string type.
 * By default it renders a `<p>`, when a list is provided it will render a `<ul>` with each error inside an `<li>`.
 * ```tsx
 * <InputError error={["error1","error2"]}>...</InputError> // Renders `<ul>`
 * <InputError error={["error1"]}>...</InputError> // Renders <p>
 * <InputError error={"error1"}>...</InputError> // Renders <p>
 * ```
 */
export const InputErrors = InputErrorsBase as UnionElementComponentType<
  DefaultElements,
  InputErrorsBaseProps
>;
