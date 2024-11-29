import { KVBase } from "../../components/button/reactButton";

export function genConstInit(name: string, initialValue: string) {
  return `const ${name} = ${initialValue}`;
}

export function genDeconstructedPropsInit(
  deconstructProps: KVBase[],
  restPropsName: string = "rest"
) {
  let allProps = "";
  deconstructProps.forEach((prop) => {
    allProps = allProps + `${prop.key}${prop.value ? ` = ${prop.value}` : ""},`;
  });
  return `const {
    ${allProps}
    ...${restPropsName}
    } = props`;
}
