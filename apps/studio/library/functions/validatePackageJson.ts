import { PJV } from "package-json-validator";

export default function validatePackageJson(val: any) {
  const validate = PJV.validate(JSON.stringify(val), "npm");
  //   console.log("package.json validation results:", validate);
  return validate.valid;
}
