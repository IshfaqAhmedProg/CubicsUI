import { TextAreaInput } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";

export function FullWidth() {
  return (
    <section>
      <TextAreaInput label="TextAreaInput with fullWidth" fullWidth />
      <TextAreaInput
        label="TextAreaInput with fullWidth and helper text"
        fullWidth
        helperText={["This is helper text"]}
      />
      <TextAreaInput
        label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatibus minima exercitationem ea quis quo vitae harum libero possimus, odio impedit quibusdam eos iure consequatur fugiat repellendus? Pariatur, repellendus atque!,Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatibus minima exercitationem ea quis quo vitae harum libero possimus, odio impedit quibusdam eos iure consequatur fugiat repellendus? Pariatur, repellendus atque!"
        fullWidth
      />
      <TextAreaInput
        startIcon={<CubicsUIFavicon />}
        endIcon={<CubicsUIFavicon />}
        label="TextAreaInput with fullWidth and icons"
        fullWidth
      />
    </section>
  );
}
