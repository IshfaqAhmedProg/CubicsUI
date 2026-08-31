"use client";

import { Button, TextAreaInput } from "@cubicsui/components";
import { useState } from "react";

export function HybridInput() {
  const [value, setValue] = useState("");
  return (
    <section>
      <h3>
        With default value {"("}uncontrolled{")"}
      </h3>
      <form>
        <TextAreaInput
          label="Enter your name"
          defaultValue={"John Doe"}
          disablePadding
          endAdornment={<Button type="reset">Reset</Button>}
        />
      </form>
      <hr />

      <h3>
        With value and onChange {"("}controlled{")"}
      </h3>
      <div className={"column"}>
        <TextAreaInput
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
