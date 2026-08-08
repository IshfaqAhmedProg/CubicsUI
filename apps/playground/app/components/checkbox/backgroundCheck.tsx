import { Card, Checkbox, TextInput } from "@cubicsui/components";
import styles from "../../page.module.css";
import { cn } from "@cubicsui/utils";
export function BackgroundCheck() {
  return (
    <section>
      <h3>On Card</h3>
      <Card className={styles.column}>
        <Checkbox label="On top of a card" />
        <Checkbox label="On top of a card" />
      </Card>
      <h3>On RGB</h3>
      <div className={cn(styles.rgb_bg, styles.column)}>
        <Checkbox label="On top of rgb colors" />
        <Checkbox label="On top of rgb colors" />
      </div>
      <h3>On Image</h3>
      <div
        className={cn(styles.image_bg, styles.column)}
        style={{ colorScheme: "dark" }}
      >
        <Checkbox label="On top of image" />
        <Checkbox label="On top of image" />
      </div>
    </section>
  );
}
