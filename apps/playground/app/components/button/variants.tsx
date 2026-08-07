import { Button } from "@cubicsui/components";
import styles from "../../page.module.css";
export function Variants() {
  return (
    <section>
      <div className={styles.row}>
        <div className={styles.column}>
          <h5>Default</h5>
          <Button>Button</Button>
        </div>
        <hr />
        <div className={styles.column}>
          <h5>Outlined</h5>
          <Button variant="outlined">Button</Button>
        </div>
        <hr />
        <div className={styles.column}>
          <h5>Contained</h5>
          <Button variant="contained">Button</Button>
        </div>
      </div>
    </section>
  );
}
