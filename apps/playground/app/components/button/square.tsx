import { Button } from "@cubicsui/components";
import styles from "../../page.module.css";
import { CubicsUIFavicon } from "@cubicsui/icons";
export function Square() {
  return (
    <section>
      <p>Use this for buttons containing only icons</p>
      <h5>Default</h5>
      <div className={styles.row}>
        <div className={styles.column}>
          <h6>Extra Small</h6>
          <Button square size="xs">
            <CubicsUIFavicon width={16} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Small</h6>
          <Button square size="sm">
            <CubicsUIFavicon width={18} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Medium</h6>
          <Button square size="md">
            <CubicsUIFavicon width={24} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Large</h6>
          <Button square size="lg">
            <CubicsUIFavicon width={28} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Extra Large</h6>
          <Button square size="xl">
            <CubicsUIFavicon width={32} />
          </Button>
        </div>
      </div>
      <h5>Outlined</h5>
      <div className={styles.row}>
        <div className={styles.column}>
          <h6>Extra Small</h6>
          <Button square variant="outlined" size="xs">
            <CubicsUIFavicon width={16} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Small</h6>
          <Button square variant="outlined" size="sm">
            <CubicsUIFavicon width={18} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Medium</h6>
          <Button square variant="outlined" size="md">
            <CubicsUIFavicon width={24} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Large</h6>
          <Button square variant="outlined" size="lg">
            <CubicsUIFavicon width={28} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Extra Large</h6>
          <Button square variant="outlined" size="xl">
            <CubicsUIFavicon width={32} />
          </Button>
        </div>
      </div>
      <h5>Contained</h5>
      <div className={styles.row}>
        <div className={styles.column}>
          <h6>Extra Small</h6>
          <Button square variant="contained" size="xs">
            <CubicsUIFavicon width={16} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Small</h6>
          <Button square variant="contained" size="sm">
            <CubicsUIFavicon width={18} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Medium</h6>
          <Button square variant="contained" size="md">
            <CubicsUIFavicon width={24} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Large</h6>
          <Button square variant="contained" size="lg">
            <CubicsUIFavicon width={28} />
          </Button>
        </div>
        <div className={styles.column}>
          <h6>Extra Large</h6>
          <Button square variant="contained" size="xl">
            <CubicsUIFavicon width={32} />
          </Button>
        </div>
      </div>
    </section>
  );
}
