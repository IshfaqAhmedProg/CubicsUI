import { PasswordInput, Button } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";

export function DisablePadding() {
  return (
    <section>
      <p>
        Use to remove the padding of the inputWrapper, mainly used when using{" "}
        <code>{"<Button/>"}</code> for start or end icons
      </p>
      <PasswordInput
        disablePadding
        label="Without icon is not supposed to be used"
      />
      <PasswordInput
        label="Normal Icon Without disable padding"
        startIcon={<CubicsUIFavicon />}
      />
      <PasswordInput
        label="Button Icon Without disable padding"
        startIcon={
          <Button icon>
            <CubicsUIFavicon />
          </Button>
        }
      />

      <PasswordInput
        disablePadding
        label="Button Start Icon with disable padding"
        startIcon={
          <Button icon>
            <CubicsUIFavicon />
          </Button>
        }
      />
      <PasswordInput
        disablePadding
        label="Button End Icon with disable padding"
        endIcon={
          <Button variant="outlined" icon>
            <CubicsUIFavicon />
          </Button>
        }
      />
      <PasswordInput
        disablePadding
        label="Button Both Icons with disable padding"
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
