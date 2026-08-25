import { PasswordInput, Button } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";

export function WithIcons() {
  return (
    <section>
      <PasswordInput
        label="Password input with start icons"
        startIcon={<CubicsUIFavicon />}
      />
      <PasswordInput
        label="Password input with end icons"
        endIcon={<CubicsUIFavicon />}
      />
      <PasswordInput
        label="Password input with both icons"
        startIcon={<CubicsUIFavicon />}
        endIcon={<CubicsUIFavicon />}
      />

      <PasswordInput
        label="Password input with start button icons"
        disablePadding
        startIcon={
          <Button icon>
            <CubicsUIFavicon />
          </Button>
        }
      />
      <PasswordInput
        label="Password input with end button icons"
        disablePadding
        endIcon={
          <Button icon>
            <CubicsUIFavicon />
          </Button>
        }
      />
      <PasswordInput
        label="Password input with both button icons"
        disablePadding
        startIcon={
          <Button icon>
            <CubicsUIFavicon />
          </Button>
        }
        endIcon={
          <Button icon>
            <CubicsUIFavicon />
          </Button>
        }
      />
    </section>
  );
}
