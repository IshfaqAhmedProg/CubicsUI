import { Button } from "@cubicsui/components";
import styles from "../../page.module.css";
export function Colors() {
  return (
    <section>
      <p>
        The main colors that should be used most of the time are <b>default</b>,{" "}
        <b>primary</b>, <b>secondary</b> and <b>error</b>. Use the rest only if
        necessary or the other three are not suitable.
      </p>
      <h5>Default</h5>
      <div className={styles.row}>
        <Button>Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="tertiary">Tertiary</Button>
        <Button color="error">Error</Button>
        <Button color="warn">Warn</Button>
        <Button color="success">Success</Button>
      </div>
      <h5>Outlined</h5>
      <div className={styles.row}>
        <Button variant="outlined">Default</Button>
        <Button variant="outlined" color="primary">
          Primary
        </Button>
        <Button variant="outlined" color="secondary">
          Secondary
        </Button>
        <Button variant="outlined" color="tertiary">
          Tertiary
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
        <Button variant="outlined" color="warn">
          Warn
        </Button>
        <Button variant="outlined" color="success">
          Success
        </Button>
      </div>
      <h5>Contained</h5>
      <div className={styles.row}>
        <Button variant="contained">Default</Button>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" color="tertiary">
          Tertiary
        </Button>
        <Button variant="contained" color="error">
          Error
        </Button>
        <Button variant="contained" color="warn">
          Warn
        </Button>
        <Button variant="contained" color="success">
          Success
        </Button>
      </div>
    </section>
  );
}
