import { TextInput } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";

export function FullWidth() {
  return (
    <section>
      <TextInput label="TextInput with fullWidth" fullWidth />
      <TextInput
        label="TextInput with fullWidth and helper text"
        fullWidth
        helperText={["This is helper text"]}
      />
      <TextInput
        label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatibus minima exercitationem ea quis quo vitae harum libero possimus, odio impedit quibusdam eos iure consequatur fugiat repellendus? Pariatur, repellendus atque!,Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatibus minima exercitationem ea quis quo vitae harum libero possimus, odio impedit quibusdam eos iure consequatur fugiat repellendus? Pariatur, repellendus atque!"
        fullWidth
      />
      <TextInput
        startIcon={<CubicsUIFavicon />}
        endIcon={<CubicsUIFavicon />}
        label="TextInput with fullWidth and icons"
        fullWidth
      />
    </section>
  );
}
