import { TextAreaInput, Button } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";

export function DisableResize() {
  return (
    <section>
      <p>
        Use <code>disableResize</code> to remove the resize handle from the{" "}
        <code>{"<textarea/>"}</code>
      </p>
      <TextAreaInput disableResize label="Resize handle is removed" />
      <TextAreaInput
        disableResize
        label="Resize handle is removed with rows={15}"
        rows={15}
      />
    </section>
  );
}
