import { Button } from "@cubicsui/components";
import styles from "../../page.module.css";
import { CubicsUIFavicon } from "@cubicsui/icons";
export function IconButton() {
  return (
    <section>
      <p>Use this for buttons containing only icons</p>
      <h5>Default</h5>
      <div className={styles.row}>
        <div className={styles.column}>
          <h6>Extra Small</h6>
          <Button icon size="xs">
            <CubicsUIFavicon width={16} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Small</h6>
          <Button icon size="sm">
            <CubicsUIFavicon width={18} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Medium</h6>
          <Button icon size="md">
            <CubicsUIFavicon width={24} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Large</h6>
          <Button icon size="lg">
            <CubicsUIFavicon width={28} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Extra Large</h6>
          <Button icon size="xl">
            <CubicsUIFavicon width={32} />
          </Button>
        </div>
      </div>
      <h5>Outlined</h5>
      <div className={styles.row}>
        <div className={styles.column}>
          <h6>Extra Small</h6>
          <Button icon variant="outlined" size="xs">
            <CubicsUIFavicon width={16} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Small</h6>
          <Button icon variant="outlined" size="sm">
            <CubicsUIFavicon width={18} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Medium</h6>
          <Button icon variant="outlined" size="md">
            <CubicsUIFavicon width={24} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Large</h6>
          <Button icon variant="outlined" size="lg">
            <CubicsUIFavicon width={28} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Extra Large</h6>
          <Button icon variant="outlined" size="xl">
            <CubicsUIFavicon width={32} />
          </Button>
        </div>
      </div>
      <h5>Contained</h5>
      <div className={styles.row}>
        <div className={styles.column}>
          <h6>Extra Small</h6>
          <Button icon variant="contained" size="xs">
            <CubicsUIFavicon width={16} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Small</h6>
          <Button icon variant="contained" size="sm">
            <CubicsUIFavicon width={18} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Medium</h6>
          <Button icon variant="contained" size="md">
            <CubicsUIFavicon width={24} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Large</h6>
          <Button icon variant="contained" size="lg">
            <CubicsUIFavicon width={28} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Extra Large</h6>
          <Button icon variant="contained" size="xl">
            <CubicsUIFavicon width={32} />
          </Button>
        </div>
      </div>
    </section>
  );
}
