"use client";

import { useState } from "react";
import styles from "../../page.module.css";
import { Button, PasswordStrengthMeter } from "@cubicsui/components";

export function Feedback() {
  const feedbacks = {
    warning: "this is a top-10 common password",
    suggestions: ["Make it a bit longer", "Add few more words"],
  } as const;
  const [selected, setSelected] = useState<keyof typeof feedbacks>("warning");
  return (
    <section className={styles.column}>
      <p>Select a type of feedback to see below</p>
      <div className={styles.row}>
        {(Object.keys(feedbacks) as Array<keyof typeof feedbacks>).map((k) => (
          <Button
            key={k}
            variant={selected == k ? "contained" : "outlined"}
            onClick={() => setSelected(k)}
          >
            {k}
          </Button>
        ))}
      </div>
      <PasswordStrengthMeter
        score={1}
        feedback={{ [selected]: feedbacks[selected] }}
      />
    </section>
  );
}
