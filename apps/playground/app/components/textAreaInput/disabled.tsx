import { TextAreaInput } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";

export function Disabled() {
  return (
    <section>
      <TextAreaInput label="Disabled TextAreaInput" disabled />
      <TextAreaInput
        label="Disabled TextAreaInput"
        defaultValue={"This is disabled"}
        disabled
      />
      <TextAreaInput
        label="Disabled TextAreaInput"
        defaultValue={"This is disabled"}
        disabled
        startIcon={<CubicsUIFavicon />}
      />
    </section>
  );
}
