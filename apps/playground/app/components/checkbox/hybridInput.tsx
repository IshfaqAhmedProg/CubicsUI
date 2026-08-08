"use client";

import {
  Button,
  Checkbox,
  CheckboxProvider,
  TextInput,
} from "@cubicsui/components";
import { useState, type SubmitEvent } from "react";
import styles from "../../page.module.css";

export function HybridInput() {
  const [value, setValue] = useState(false);
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target);
    alert(JSON.stringify(Object.fromEntries(formData.entries())));
  }
  return (
    <section>
      <h3>
        With default value {"("}uncontrolled{")"}
      </h3>
      <form onSubmit={handleSubmit}>
        <CheckboxProvider>
          <Checkbox
            label="An uncontrolled checkbox, result will be empty if unchecked"
            defaultChecked
            name="uncontrolled-checkbox"
            startIcon={<Button type="reset">Reset</Button>}
            endIcon={
              <Button type="submit" variant="contained">
                Submit
              </Button>
            }
          />
        </CheckboxProvider>
      </form>
      <hr />

      <h3>
        With value and onChange {"("}controlled{")"}
      </h3>
      <div className={styles.column}>
        <Checkbox
          label="The checked status of the checkbox is shown below"
          checked={value}
          onChange={(e, v) => setValue(v)}
        />
        <p>
          Result : <b>{JSON.stringify(value)}</b>
        </p>
      </div>
    </section>
  );
}
