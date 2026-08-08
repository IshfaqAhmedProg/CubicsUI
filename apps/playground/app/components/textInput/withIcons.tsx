import { TextInput, Button } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";

export function WithIcons() {
  return (
    <section>
      <TextInput label="Start Icon" startIcon={<CubicsUIFavicon />} />
      <TextInput label="End Icon" endIcon={<CubicsUIFavicon />} />
      <TextInput
        label="Both Icons"
        startIcon={<CubicsUIFavicon />}
        endIcon={<CubicsUIFavicon />}
      />
      <TextInput
        disablePadding
        label="Button Start Icon"
        startIcon={
          <Button square>
            <CubicsUIFavicon />
          </Button>
        }
      />
      <TextInput
        disablePadding
        label="Button End Icon"
        endIcon={
          <Button variant="outlined" square>
            <CubicsUIFavicon />
          </Button>
        }
      />
      <TextInput
        disablePadding
        label="Button Both Icons"
        startIcon={
          <Button variant="contained" square>
            <CubicsUIFavicon />
          </Button>
        }
        endIcon={
          <Button variant="contained" square>
            <CubicsUIFavicon />
          </Button>
        }
      />
    </section>
  );
}
