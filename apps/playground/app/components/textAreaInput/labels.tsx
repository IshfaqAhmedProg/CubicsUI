import { TextAreaInput } from "@cubicsui/components";
import styles from "../../page.module.css";

export function Labels() {
  return (
    <section>
      <div className={styles.column}>
        <h3>
          <code>{"<TextInput/>"}</code> with label
        </h3>
        <TextAreaInput label="Enter your first name" />
        <TextAreaInput label="This is a really long label, a really really long label" />
      </div>
      <hr />
      <div className={styles.column}>
        <h3>
          <code>{"<TextAreaInput/>"}</code> without label
        </h3>
        <p>
          You have to use <code>placeholder</code> prop to do labelling
        </p>
        <TextAreaInput placeholder="Enter your first name" />
        <TextAreaInput placeholder="This is a really long label, how long you say? Really long." />
      </div>
      <hr />
      <div className={styles.column}>
        <h3>
          <code>A required {"<TextAreaInput/>"}</code>
        </h3>
        <TextAreaInput required label="Enter your first name" />
      </div>
    </section>
  );
}
