import { reactModularImports } from "./components/Accordion/accordionGenerator";

function main() {
  const check = reactModularImports(["useState", "useEffect", "forwardRef"]);
  console.log(check);
}
main();
