import styles from "../../page.module.css";
import { Checkbox } from "@cubicsui/components";
import { Solo } from "./solo";
import { InGroup } from "./inGroup";
import { HybridInput } from "./hybridInput";
import { Sizes } from "./sizes";
import { Colors } from "./colors";
import { HelperText } from "./helperText";
import { WithIcons } from "./withIcons";
import { CustomIcons } from "./customIcons";
import { BackgroundCheck } from "./backgroundCheck";

export default function Page() {
  return (
    <div className={styles.root}>
      <h1>Checkbox</h1>

      <h2>Solo</h2>
      <Solo />
      <hr />

      <h2>In Group</h2>
      <InGroup />
      <hr />

      <h2>Hybrid input</h2>
      <HybridInput />
      <hr />

      <h2>Sizes</h2>
      <Sizes />
      <hr />

      <h2>Colors</h2>
      <Colors />
      <hr />

      <h2>Background Check</h2>
      <BackgroundCheck />
      <hr />

      <h2>With start and end Icon</h2>
      <WithIcons />
      <hr />

      <h2>With custom checked and indeterminate Icon</h2>
      <CustomIcons />
      <hr />

      <h2>Helper text</h2>
      <HelperText />
      <hr />
      <h2>
        Disabled <code>{"<Checkbox/>"}</code>
      </h2>
      <section>
        <Checkbox label="Disabled Checkbox" disabled />
      </section>
    </div>
  );
}
