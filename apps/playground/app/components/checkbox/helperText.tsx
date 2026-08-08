import { Checkbox } from "@cubicsui/components";
import styles from "../../page.module.css";

export function HelperText() {
  return (
    <section>
      <div className={styles.column}>
        <h3>Normal Helper text</h3>
        <Checkbox
          label="Checkbox with helper text"
          helperText="Make sure to add in format city, state, country"
        />
        <Checkbox
          label="Checkbox with multiple helper texts"
          helperText={["Do this", "and then that"]}
        />
      </div>
      <hr />
      <div className={styles.column}>
        <h3>When Errored</h3>
        <Checkbox
          label="Errored Checkbox"
          error="Make sure to check the Checkbox here"
        />
        <Checkbox
          label="Errored Checkbox with multiple errors"
          error={["This Checkbox has", "multiple errors"]}
        />
      </div>
    </section>
  );
}
