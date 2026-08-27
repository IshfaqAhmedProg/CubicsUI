import { TextInput } from "@cubicsui/components";
import { HybridInput } from "./hybridInput";
import { CubicsUIFavicon } from "@cubicsui/icons";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<TextInput/>"}</code>
      </h1>
      <h2>Labels</h2>
      <section>
        <div className={"column"}>
          <h3>
            <code>{"<TextInput/>"}</code> with label
          </h3>
          <TextInput label="Enter your first name" />
          <TextInput label="This is a really long label, a really really long label" />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            <code>{"<TextInput/>"}</code> without label
          </h3>
          <p>
            You have to use <code>placeholder</code> prop to do labelling
          </p>
          <TextInput placeholder="Enter your first name" />
          <TextInput placeholder="This is a really long label, how long you say? Really long." />
        </div>
        <hr />
        <div className={"column"}>
          <h3>
            A required <code>{"<TextInput/>"}</code>
          </h3>
          <TextInput required label="Enter your first name" />
        </div>
      </section>

      <h2>Hybrid input</h2>
      <HybridInput />

      <h2>Full Width input</h2>
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
          startAdornment={<CubicsUIFavicon />}
          endAdornment={<CubicsUIFavicon />}
          label="TextInput with fullWidth and icons"
          fullWidth
        />
      </section>
    </main>
  );
}
