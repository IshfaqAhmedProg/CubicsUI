"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import styles from "./PasswordStrengthMeter.module.css";
import type { PasswordStrengthMeterProps } from "./PasswordStrengthMeter.types";
import { InputHelperText } from "../../Typography/InputHelperText/InputHelperText";
import { cn } from "@cubicsui/utils";

export function PasswordStrengthMeter(
  props: PasswordStrengthMeterProps,
): ReactElement {
  const {
    className,
    score = 0,
    scoreWords = ["Weak", "Okay", "Good", "Strong", "Very strong"],
    feedback,
    slotProps = {},
    ...rest
  } = props;
  const [scoreWord, setScoreWord] = useState(scoreWords[0]);
  const scoreStyles = {
    "--score": score,
  } as CSSProperties;

  useEffect(() => {
    setScoreWord(scoreWords[score]);
  }, [score, scoreWords]);

  return (
    <div className={cn(styles.root, className)} {...rest}>
      <div
        {...slotProps.meterWrapper}
        className={cn(styles.meterWrapper, slotProps.meterWrapper?.className)}
      >
        <div
          {...slotProps.meter}
          className={cn(styles.meter, slotProps.meter?.className)}
          style={{ ...slotProps.meter?.style, ...scoreStyles }}
          data-score={!!score}
        />
        <div
          {...slotProps.scoreWord}
          className={cn(styles.scoreWord, slotProps.scoreWord?.className)}
        >
          {scoreWord}
        </div>
      </div>
      <InputHelperText
        {...slotProps.feedback}
        className={cn(styles.feedback, slotProps.feedback?.className)}
        data-warning={!!feedback?.warning}
        text={feedback?.warning ?? feedback?.suggestions}
      />
    </div>
  );
}
