import { PasswordInput, TextInput } from "@cubicsui/components";
import styles from "../../page.module.css";
import { StrengthMeter } from "./strengthMeter";
import { WithIcons } from "./withIcons";
import { HybridInput } from "./hybridInput";
import { Sizes } from "./sizes";
import { DisablePadding } from "./disablePadding";

export default function Page() {
  return (
    <div className={styles.root}>
      <h1>PasswordInput</h1>

      <h2>
        With <code>enableStrengthMeter</code>
      </h2>
      <StrengthMeter />
      <hr />

      <h2>
        With <code>disableVisibilityToggle</code>
      </h2>
      <section>
        <PasswordInput
          label="Visibility Toggle Disabled"
          disableVisibilityToggle
        />
      </section>
      <hr />

      <h2>Sizes</h2>
      <Sizes />
      <hr />
      
      <h2>Hybrid Input</h2>
      <HybridInput />
      <hr />

      <h2>With start and end icons</h2>
      <WithIcons />
      <hr />

      <h2>Disable Padding</h2>
      <DisablePadding />
    </div>
  );
}
