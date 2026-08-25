import { Strength } from "./strength";
import { Feedback } from "./feedback";
import { CustomScoreWords } from "./customScoreWords";
import styles from "../../page.module.css";

export default function Page() {
  return (
    <div className={styles.root}>
      <h1>PasswordStrengthMeter</h1>
      <p>
        Strength of the password from 0-4, the strength value can be got from
        something like <a href="https://github.com/zxcvbn-ts/zxcvbn">zxcvbn</a>
        values and definitions shown below are taken from zxcvbn
      </p>
      <ul>
        <li>0 = too guessable: risky password. </li>
        <li>1 = very guessable: protection from throttled online attacks.</li>
        <li>
          2 = somewhat guessable: protection from unthrottled online attacks.
        </li>
        <li>
          3 = safely unguessable: moderate protection from offline slow-hash
          scenario.
        </li>
        <li>
          4 = very unguessable: strong protection from offline slow-hash
          scenario.
        </li>
      </ul>
      <h2>Strength</h2>
      <Strength />
      <hr />

      <h2>Feedback</h2>
      <Feedback />
      <hr />

      <h2>Custom Score Words</h2>
      <CustomScoreWords />
    </div>
  );
}
