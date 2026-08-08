import { TextAreaInput, Button } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";

export function WithIcons() {
  return (
    <section>
      <TextAreaInput label="Start Icon" startIcon={<CubicsUIFavicon />} />
      <TextAreaInput label="End Icon" endIcon={<CubicsUIFavicon />} />
      <TextAreaInput
        label="Both Icons"
        startIcon={<CubicsUIFavicon />}
        endIcon={<CubicsUIFavicon />}
      />
    </section>
  );
}
