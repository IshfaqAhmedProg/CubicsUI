import { genPropsTypes } from "../../utils/Typescript";
import {
  genForwardRef,
  genDefaultExport,
  genReactModularImports,
  genReactTypeImports,
  genStyleModuleImport,
} from "../../utils/React";
import {
  genDeconstructedPropsInit,
  genConstInit,
  genStringLiteral,
  genStringLiteralVar,
} from "../../utils/Javascript";
import { GenReactButtonProps, KVBase } from "../../interfaces/misc";

const ButtonProps: KVBase[] = [
  { key: "startDecoration", value: "ReactNode", optional: true },
  { key: "endDecoration", value: "ReactNode", optional: true },
  {
    key: "variant",
    value: '"contained" | "outline" | "destructive" | "ghost"',
    optional: true,
  },
  {
    key: "fullWidth",
    value: "boolean",
    optional: true,
  },
];

const DeconstructButtonProps: KVBase[] = [
  { key: "variant", value: '"contained"' },
  { key: "className", value: '""' },
  { key: "startDecoration" },
  { key: "endDecoration" },
  { key: "children" },
  { key: "fullWidth", value: "false" },
];

export default function genReactButton({
  componentName,
  mode,
  styleEngine,
  stylesName = "styles",
}: GenReactButtonProps) {
  const reactImports = `
  ${genReactModularImports(["forwardRef"])}
  ${genReactTypeImports(["ComponentPropsWithoutRef", "ReactNode"])}`;

  const styleImports = !(styleEngine == "css" || styleEngine == "scss")
    ? ""
    : genStyleModuleImport(
        `./${componentName}.module.${styleEngine}`,
        stylesName
      );
  const types =
    mode != "typescript"
      ? ""
      : genPropsTypes(
          "ButtonProps",
          ButtonProps,
          `& ComponentPropsWithoutRef<"button">`
        );

  return `
  ${reactImports}
  ${styleImports}
  
  ${types}
  
  ${genForwardRef({
    name: "Button",
    refTypeName: "HTMLButtonElement",
    componentPropsName: "ButtonProps",
    mode,
    innerContent: `
    ${genDeconstructedPropsInit(DeconstructButtonProps, "buttonProps")}
    ${genConstInit("buttonCn", genStringLiteral(`${genStringLiteralVar(`${stylesName}.button`)} ${genStringLiteralVar(`${stylesName}[variant]`)} ${genStringLiteralVar("className")}`))}
    ${genConstInit("startDecorationCn", genStringLiteral(`${genStringLiteralVar(`${stylesName}.decoration`)} ${genStringLiteralVar(`${stylesName}.start`)}`))}
    ${genConstInit("endDecorationCn", genStringLiteral(`${genStringLiteralVar(`${stylesName}.decoration`)} ${genStringLiteralVar(`${stylesName}.end`)}`))}
    return (
        <button className={buttonCn} ref={ref} {...buttonProps}>
          {startDecoration && (
            <span className={startDecorationCn}>
              {startDecoration}
            </span>
          )}
          <p className={${stylesName}.buttonText}>{children}</p>
          {endDecoration && (
            <span className={endDecorationCn}>
              {endDecoration}
            </span>
          )}
        </button>
      );
  `,
  })}
  
  ${genDefaultExport("Button")}
  `;
}
