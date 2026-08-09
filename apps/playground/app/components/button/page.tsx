import { Colors } from "./colors";
import { Sizes } from "./sizes";
import { IconButton } from "./iconButton";
import { Variants } from "./variants";
import styles from "../../page.module.css";
import { WithIcons } from "./withIcons";
import { FullWidth } from "./fullWidth";
export default function Page() {
  return (
    <div className={styles.root}>
      <h1>Button</h1>

      <h2>Variants</h2>
      <Variants />
      <hr />

      <h2>Colors</h2>
      <Colors />
      <hr />

      <h2>Sizes</h2>
      <Sizes />
      <hr />

      <h2>Icon Button</h2>
      <IconButton />

      <h2>With start and end icon</h2>
      <WithIcons />

      <h2>Full width</h2>
      <FullWidth />
    </div>
  );
}
