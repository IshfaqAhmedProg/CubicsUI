import { NamingConvention } from "@cubicsui/db";
import Case from "case";

export default function changeCase(
  str: string,
  convertToCase: NamingConvention
) {
  const { capital, camel, kebab, snake, upper } = Case;
  switch (convertToCase) {
    case "CapitalCase":
      return capital(str);
      break;
    case "UPPERCASE":
      return upper(str);
      break;
    case "snake_case":
      return snake(str);
      break;
    case "kebab-case":
      return kebab(str);
      break;
    case "camelCase":
      return camel(str);
      break;
    default:
      return str;
      break;
  }
}
