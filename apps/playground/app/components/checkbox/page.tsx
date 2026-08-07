import styles from "../../page.module.css";
import {
  Checkbox,
  CheckboxProvider,
  CheckboxGroupControl,
} from "@cubicsui/components";
import { Solo } from "./solo";
import { InGroup } from "./inGroup";
export default function Page() {
  return (
    <div className={styles.root}>
      <h1>Checkbox</h1>

      <h2>Solo</h2>
      <Solo />

      <h2>In Group</h2>
      <InGroup />

      <h2>Default checked</h2>
      <Checkbox label="Default Checked" defaultChecked />

      <h2>Sizes</h2>
      <Checkbox label="Extra small" size="xs" />
      <Checkbox label="Small" size="sm" />
      <Checkbox label="Medium" size="md" />
      <Checkbox label="Large" size="lg" />
      <Checkbox label="Extra Large" size="xl" />
      <hr />

      <h2>Colors</h2>
      <Checkbox label="Default" />
      <Checkbox label="Primary" color="primary" />
      <Checkbox label="Secondary" color="secondary" />
      <Checkbox label="Tertiary" color="tertiary" />
      <Checkbox label="Error" color="error" />
      <Checkbox label="Warn" color="warn" />
      <Checkbox label="Success" color="success" />
      <hr />

      <h2>With start and end Icon</h2>
      <hr />
      <h2>With custom checked and indeterminate Icon</h2>
      <hr />
      <h2>Errored {"<Checkbox/>"} with error message</h2>
      <Checkbox
        label="Errored Checkbox"
        error="Make sure to check the checkbox here"
      />
      <hr />
      <h2>Disabled {"<Checkbox/>"}</h2>
      <Checkbox label="Disabled Checkbox" disabled />
    </div>
  );
}
