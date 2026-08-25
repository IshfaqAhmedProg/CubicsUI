"use client";

import { useState } from "react";
import styles from "../../page.module.css";
import { Button, PasswordStrengthMeter } from "@cubicsui/components";
export function Strength() {
  const [score, setScore] = useState(0);
  const strengths = [0, 1, 2, 3, 4];
  return (
    <section className={styles.column}>
      <p>Set strength below to see the meter change</p>
      <div className={styles.row}>
        {strengths.map((s) => (
          <Button
            key={s}
            variant={score == s ? "contained" : "outlined"}
            onClick={() => setScore(s)}
          >
            {s}
          </Button>
        ))}
      </div>
      <PasswordStrengthMeter score={score} />
    </section>
  );
}
