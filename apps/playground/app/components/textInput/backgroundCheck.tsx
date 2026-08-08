import { Card, TextInput } from "@cubicsui/components";
import styles from "../../page.module.css";
import { cn } from "@cubicsui/utils";
export function BackgroundCheck() {
  return (
    <section>
      <h3>On Card</h3>
      <Card className={styles.column}>
        <TextInput
          label="On top of a card"
          placeholder="This is a placeholder"
        />
        <TextInput
          label="On top of a card"
          placeholder="This is a placeholder"
        />
      </Card>
      <h3>On RGB</h3>
      <div className={cn(styles.rgb_bg, styles.column)}>
        <TextInput
          label="On top of rgb colors"
          placeholder="This is a placeholder"
        />
        <TextInput
          label="On top of rgb colors"
          placeholder="This is a placeholder"
        />
      </div>
      <h3>On Image</h3>
      <div className={cn(styles.image_bg, styles.column)}>
        <TextInput
          label="On top of image"
          placeholder="This is a placeholder"
        />
        <TextInput
          label="On top of image"
          placeholder="This is a placeholder"
        />
      </div>
    </section>
  );
}
