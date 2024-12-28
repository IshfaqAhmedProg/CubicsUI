import { NamingConvention } from "@cubicsui/db";
import * as _ from "lodash";
export default function changeCase(
  str: string,
  convertToCase: NamingConvention
) {
  const { capitalize, camelCase, kebabCase, snakeCase, upperCase } = _;
  switch (convertToCase) {
    case "CapitalCase":
      return capitalize(str);
      break;
    case "UPPERCASE":
      return upperCase(str);
      break;
    case "snake_case":
      return snakeCase(str);
      break;
    case "kebab-case":
      return kebabCase(str);
      break;
    case "camelCase":
      return camelCase(str);
      break;
    default:
      return str;
      break;
  }
}
