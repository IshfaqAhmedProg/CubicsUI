import type { KVBase } from "../../interfaces/misc.js";

export function genPropsTypes(
  name: string,
  props: KVBase[],
  inherits?: string
) {
  let allProps = "";
  props.forEach((prop) => {
    allProps =
      allProps + `${prop.key}${prop.optional ? "?" : ""}: ${prop.value};`;
  });
  return `type ${name} = {${allProps}}${inherits ?? ""};`;
}
