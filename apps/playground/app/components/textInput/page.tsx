import { Labels } from "./labels";
import { HybridInput } from "./hybridInput";
import styles from "../../page.module.css";
import { BackgroundCheck } from "./backgroundCheck";
import { HelperText } from "./helperText";
import { DisableInputWidth } from "./disableInputWidth";
import { Disabled } from "./disabled";
import { Sizes } from "./sizes";
import { WithIcons } from "./withIcons";
import { FullWidth } from "./fullWidth";

export default function Page() {
  return (
    <div className={styles.root}>
      <h1>TextInput</h1>

      <h2>Labels</h2>
      <Labels />
      <hr />

      <h2>Hybrid input</h2>
      <HybridInput />
      <hr />

      <h2>Sizes</h2>
      <Sizes />
      <hr />

      <h2>Background check</h2>
      <BackgroundCheck />
      <hr />

      <h2>With start and end icons</h2>
      <WithIcons />
      <hr />

      <h2>Helper text</h2>
      <HelperText />
      <hr />

      <h2>Disable Input Width</h2>
      <DisableInputWidth />
      <hr />

      <h2>Full Width</h2>
      <FullWidth />
      <hr />

      <h2>
        Disabled <code>{"<TextInput/>"}</code>
      </h2>
      <Disabled />
      <hr />
    </div>
  );
}
