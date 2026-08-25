import { TextAreaInput, Button } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";

export function DisablePadding() {
  return (
    <section>
      <p>
        Use to remove the padding of the inputWrapper, mainly used when using{" "}
        <code>{"<Button/>"}</code> for start or end icons
      </p>
      <TextAreaInput
        disablePadding
        label="Without icon is not supposed to be used"
      />
      <TextAreaInput
        label="Normal Icon Without disablePadding"
        startIcon={<CubicsUIFavicon />}
      />
      <TextAreaInput
        label="Button Icon Without disablePadding"
        startIcon={
          <Button icon>
            <CubicsUIFavicon />
          </Button>
        }
      />

      <TextAreaInput
        disablePadding
        label="Button Start Icon with disablePadding"
        startIcon={
          <Button icon>
            <CubicsUIFavicon />
          </Button>
        }
      />
      <TextAreaInput
        disablePadding
        label="Button End Icon with disablePadding"
        endIcon={
          <Button variant="outlined" icon>
            <CubicsUIFavicon />
          </Button>
        }
      />
      <TextAreaInput
        disablePadding
        label="Button Both Icons with disablePadding"
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
      <TextAreaInput
        disablePadding
        disableResize
        label="Button Both Icons with disablePadding, disableResize and rows={1}"
        rows={1}
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
