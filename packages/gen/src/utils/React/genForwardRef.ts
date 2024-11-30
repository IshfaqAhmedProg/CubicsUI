import { GenComponentBase } from "../../interfaces/misc";

type GenForwardRefProps = {
  name: string;
  refTypeName: string;
  componentPropsName: string;
  innerContent: string;
} & GenComponentBase;
export default function genForwardRef({
  name,
  refTypeName,
  componentPropsName,
  mode,
  innerContent,
}: GenForwardRefProps) {
  let typings =
    mode == "typescript" ? `<${refTypeName}, ${componentPropsName}>` : "";
  return `const ${name} = forwardRef${typings}(function inner${name}(props, ref){${innerContent}});`;
}
