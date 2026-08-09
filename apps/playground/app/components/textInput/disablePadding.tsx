import { TextInput, Button } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";

export function DisablePadding() {
  return (
    <section>
      <p>
        Use to remove the padding of the inputWrapper, mainly used when using{" "}
        <code>{"<Button/>"}</code> for start or end icons
      </p>
      <TextInput
        disablePadding
        label="Without icon is not supposed to be used"
      />
      <TextInput
        disablePadding
        label="Button Start Icon"
        startIcon={
          <Button icon>
            <CubicsUIFavicon />
          </Button>
        }
      />
      <TextInput
        disablePadding
        label="Button End Icon"
        endIcon={
          <Button variant="outlined" icon>
            <CubicsUIFavicon />
          </Button>
        }
      />
      <TextInput
        disablePadding
        label="Button Both Icons"
        startIcon={
          <Button variant="contained" icon>
            <CubicsUIFavicon />
          </Button>
        }
        endIcon={
          <Button variant="contained" icon>
            <CubicsUIFavicon />
          </Button>
        }
      />
    </section>
  );
}
