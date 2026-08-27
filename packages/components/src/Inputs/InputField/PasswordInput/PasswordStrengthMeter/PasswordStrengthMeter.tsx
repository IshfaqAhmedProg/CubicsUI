"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import type { PasswordStrengthMeterProps } from "./PasswordStrengthMeter.types";
import { cn } from "@cubicsui/utils";
import { TextOrList } from "../../../../Typography/TextOrList/TextOrList";
import "./PasswordStrengthMeter.styles.css";

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
    <div className={cn("PasswordStrengthMeter_root", className)} {...rest}>
      <div
        {...slotProps.meterWrapper}
        className={cn(
          "PasswordStrengthMeter_container",
          slotProps.meterWrapper?.className,
        )}
      >
        <div
          {...slotProps.meter}
          className={cn(
            "PasswordStrengthMeter_meter",
            slotProps.meter?.className,
          )}
          style={{ ...slotProps.meter?.style, ...scoreStyles }}
          data-score={!!score}
        />
        <div
          {...slotProps.scoreWord}
          className={cn(
            "PasswordStrengthMeter_scoreWord",
            slotProps.scoreWord?.className,
          )}
        >
          {scoreWord}
        </div>
      </div>
      <TextOrList
        {...slotProps.feedback}
        className={cn(
          "PasswordStrengthMeter_feedback",
          slotProps.feedback?.className,
        )}
        data-warning={!!feedback?.warning}
        text={feedback?.warning ?? feedback?.suggestions}
      />
    </div>
  );
}
