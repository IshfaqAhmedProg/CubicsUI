import { Button } from "@cubicsui/components";
import styles from "../../page.module.css";
export function Sizes() {
  return (
    <section>
      <h5>Default</h5>
      <div className={styles.row}>
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
      <h5>Outlined</h5>
      <div className={styles.row}>
        <Button variant="outlined" size="xs">
          Extra small
        </Button>
        <Button variant="outlined" size="sm">
          Small
        </Button>
        <Button variant="outlined" size="md">
          Medium
        </Button>
        <Button variant="outlined" size="lg">
          Large
        </Button>
        <Button variant="outlined" size="xl">
          Extra Large
        </Button>
      </div>
      <h5>Contained</h5>
      <div className={styles.row}>
        <Button variant="contained" size="xs">
          Extra small
        </Button>
        <Button variant="contained" size="sm">
          Small
        </Button>
        <Button variant="contained" size="md">
          Medium
        </Button>
        <Button variant="contained" size="lg">
          Large
        </Button>
        <Button variant="contained" size="xl">
          Extra Large
        </Button>
      </div>
    </section>
  );
}
