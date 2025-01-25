import { components } from "@cubicsui/db";

interface StyleFileNameProps {
  fileName?: string;
  component: components;
}

export default function createStyleFileName({
  fileName,
  component,
}: StyleFileNameProps) {
  const styleAsModule = component.deps.lcl.find(
    (dep) => dep.cmpId === "styles"
  );
  if (styleAsModule) {
    return styleAsModule.name;
  } else {
    const stfn = fileName?.split(".");
    stfn?.pop();
    return stfn;
  }
}
