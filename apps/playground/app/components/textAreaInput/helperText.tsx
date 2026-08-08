import { TextAreaInput } from "@cubicsui/components";
import styles from "../../page.module.css";
export function HelperText() {
  return (
    <section>
      <div className={styles.column}>
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
      <div className={styles.column}>
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
  );
}
