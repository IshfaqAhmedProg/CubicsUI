import { Button, Card, TextAreaInput } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";
import { HybridInput } from "./hybridInput";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<TextAreaInput/>"}</code>
      </h1>
      <h2>Labels</h2>
      <section>
        <div className={"column"}>
          <h3>
            <code>{"<TextAreaInput/>"}</code> with label
          </h3>
          <TextAreaInput label="Enter your first name" />
          <TextAreaInput label="This is a really long label, a really really long label" />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            <code>{"<TextAreaInput/>"}</code> without label
          </h3>
          <p>
            You have to use <code>placeholder</code> prop to do labelling
          </p>
          <TextAreaInput placeholder="Enter your first name" />
          <TextAreaInput placeholder="This is a really long label, how long you say? Really long." />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            A required <code>{"<TextAreaInput/>"}</code>
          </h3>
          <TextAreaInput required label="Enter your first name" />
        </div>
      </section>

      <h2>
        With <code>disableResize</code>
      </h2>
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

      <h2>Hybrid input</h2>
      <HybridInput />

      <h2>Sizes</h2>
      <section>
        <TextAreaInput label="Extra Small" size="xs" />
        <TextAreaInput label="Small" size="sm" />
        <TextAreaInput label="Medium" size="md" />
        <TextAreaInput label="Large" size="lg" />
        <TextAreaInput label="Extra Large" size="xl" />
      </section>

      <h2>Background Check</h2>
      <section>
        <h3>On Card</h3>
        <Card className={"column"}>
          <TextAreaInput
            label="On top of a card"
            placeholder="This is a placeholder"
          />
          <TextAreaInput
            label="On top of a card"
            placeholder="This is a placeholder"
          />
        </Card>
        <h3>On RGB</h3>
        <div className={"column rgb_bg"}>
          <TextAreaInput
            label="On top of rgb colors"
            placeholder="This is a placeholder"
          />
          <TextAreaInput
            label="On top of rgb colors"
            placeholder="This is a placeholder"
          />
        </div>
        <h3>On Image</h3>
        <div className={"column image_bg"}>
          <TextAreaInput
            label="On top of image"
            placeholder="This is a placeholder"
          />
          <TextAreaInput
            label="On top of image"
            placeholder="This is a placeholder"
          />
        </div>
      </section>

      <h2>Helper Text</h2>
      <section>
        <div className={"column"}>
          <h3>Normal Helper text</h3>
          <TextAreaInput
            label="Enter address"
            helperText="Make sure to add in format city, state, country"
          />
          <TextAreaInput
            label="TextAreaInput with multiple helper texts"
            helperText={["Do this", "and then that"]}
          />
        </div>
        <hr />
        <div className={"column"}>
          <h3>When Errored</h3>
          <TextAreaInput
            label="Errored TextAreaInput"
            error="Make sure to check the TextAreaInput here"
          />
          <TextAreaInput
            label="Errored TextAreaInput with multiple errors"
            error={["This TextAreaInput has", "multiple errors"]}
          />
        </div>
      </section>

      <h2>
        With <code>fullWidth</code>{" "}
      </h2>
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
          startAdornment={<CubicsUIFavicon />}
          endAdornment={<CubicsUIFavicon />}
          label="TextAreaInput with fullWidth and icons"
          fullWidth
        />
      </section>

      <h2>
        With <code>disablePadding</code>
      </h2>
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
          label="Normal Icon Without disable padding"
          startAdornment={<CubicsUIFavicon />}
        />
        <TextAreaInput
          label="Button Icon Without disable padding"
          startAdornment={
            <Button icon>
              <CubicsUIFavicon />
            </Button>
          }
        />

        <TextAreaInput
          disablePadding
          label="Button Start Icon with disable padding"
          startAdornment={
            <Button icon>
              <CubicsUIFavicon />
            </Button>
          }
        />
        <TextAreaInput
          disablePadding
          label="Button End Icon with disable padding"
          endAdornment={
            <Button variant="outlined" icon>
              <CubicsUIFavicon />
            </Button>
          }
        />
        <TextAreaInput
          disablePadding
          label="Button Both Icons with disable padding"
          startAdornment={
            <Button variant="contained" icon>
              <CubicsUIFavicon />
            </Button>
          }
          endAdornment={
            <Button variant="contained" icon>
              <CubicsUIFavicon />
            </Button>
          }
        />
      </section>

      <h2>Disabled Input</h2>
      <section>
        <TextAreaInput label="Disabled TextAreaInput" disabled />
        <TextAreaInput label="Enabled TextAreaInput" />
        <TextAreaInput
          label="Disabled TextAreaInput with default value"
          defaultValue={"This is disabled"}
          disabled
        />
      </section>
    </main>
  );
}
