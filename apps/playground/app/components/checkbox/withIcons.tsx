import { Checkbox } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";

export function WithIcons() {
  return (
    <section>
      <Checkbox startIcon={<CubicsUIFavicon />} label="With start Icon" />
      <Checkbox endIcon={<CubicsUIFavicon />} label="With end Icon" />
      <Checkbox
        endIcon={<CubicsUIFavicon />}
        startIcon={<CubicsUIFavicon />}
        label="With both Icons"
      />
    </section>
  );
}
