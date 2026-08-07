import { Button } from "@cubicsui/components";
import { CubicsUIFavicon } from "@cubicsui/icons";
import styles from "../../page.module.css";

export function WithIcons() {
  return (
    <section>
      <h5>Default</h5>
      <div className={styles.row}>
        <Button startIcon={<CubicsUIFavicon />}>With Start Icon</Button>
        <Button endIcon={<CubicsUIFavicon />}>With End Icon</Button>
        <Button startIcon={<CubicsUIFavicon />} endIcon={<CubicsUIFavicon />}>
          With Both Icons
        </Button>
      </div>
      <h5>Outlined</h5>
      <div className={styles.row}>
        <Button variant="outlined" startIcon={<CubicsUIFavicon />}>
          With Start Icon
        </Button>
        <Button variant="outlined" endIcon={<CubicsUIFavicon />}>
          With End Icon
        </Button>
        <Button
          variant="outlined"
          startIcon={<CubicsUIFavicon />}
          endIcon={<CubicsUIFavicon />}
        >
          With Both Icons
        </Button>
      </div>
      <h5>Contained</h5>
      <div className={styles.row}>
        <Button variant="contained" startIcon={<CubicsUIFavicon />}>
          With Start Icon
        </Button>
        <Button variant="contained" endIcon={<CubicsUIFavicon />}>
          With End Icon
        </Button>
        <Button
          variant="contained"
          startIcon={<CubicsUIFavicon />}
          endIcon={<CubicsUIFavicon />}
        >
          With Both Icons
        </Button>
      </div>
    </section>
  );
}
