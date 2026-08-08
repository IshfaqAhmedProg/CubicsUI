import { TextInput } from "@cubicsui/components";
import styles from "../../page.module.css";
export function HelperText() {
  return (
    <section>
      <div className={styles.column}>
        <h3>Normal Helper text</h3>
        <TextInput
          label="Enter address"
          helperText="Make sure to add in format city, state, country"
        />
        <TextInput
          label="TextInput with multiple helper texts"
          helperText={["Do this", "and then that"]}
        />
      </div>
      <hr />
      <div className={styles.column}>
        <h3>When Errored</h3>
        <TextInput
          label="Errored TextInput"
          error="Make sure to check the TextInput here"
        />
        <TextInput
          label="Errored TextInput with multiple errors"
          error={["This textinput has", "multiple errors"]}
        />
      </div>
    </section>
  );
}
