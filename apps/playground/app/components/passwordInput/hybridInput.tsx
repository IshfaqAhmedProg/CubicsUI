"use client";

import { Button, PasswordInput } from "@cubicsui/components";
import { useState, type SubmitEvent } from "react";
import styles from "../../page.module.css";

export function HybridInput() {
  const [value, setValue] = useState("");
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    alert(JSON.stringify(Object.fromEntries(formData.entries())));
  }
  return (
    <section>
      <h3>
        With default value {"("}uncontrolled{")"}
      </h3>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          label="Enter your password"
          name="password-check"
          defaultValue={"12345678"}
          disablePadding
          endIcon={
            <Button type="reset" variant="outlined">
              Reset
            </Button>
          }
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <hr />

      <h3>
        With value and onChange {"("}controlled{")"}
      </h3>
      <div className={styles.column}>
        <PasswordInput
          label="Type something to change the value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p>
          Result : <b>{JSON.stringify(value)}</b>
        </p>
      </div>
    </section>
  );
}
