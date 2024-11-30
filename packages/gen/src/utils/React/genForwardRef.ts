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
  const t =
    mode == "typescript" ? `<${refTypeName},${componentPropsName}>` : "";
  return `const ${name}=forwardRef${t}(function inner${name}(props, ref){${innerContent}});`;
}
