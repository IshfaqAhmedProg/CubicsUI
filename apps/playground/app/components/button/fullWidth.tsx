import { Button } from "@cubicsui/components";
import styles from "../../page.module.css";
import { CubicsUIFavicon } from "@cubicsui/icons";

export function FullWidth() {
  return (
    <section>
      <p>
        Use this when button should expand to the full width of the container
      </p>
      <h5>Default</h5>
      <Button fullWidth>Full Width Button</Button>
      <h5>Outlined</h5>
      <Button variant="outlined" fullWidth>
        Full Width Button
      </Button>
      <h5>Contained</h5>
      <Button variant="contained" fullWidth>
        Full Width Button
      </Button>
      <h5>Full Width with icon</h5>
      <Button variant="contained" startIcon={<CubicsUIFavicon />} fullWidth>
        Full Width Button
      </Button>
      <Button variant="contained" endIcon={<CubicsUIFavicon />} fullWidth>
        Full Width Button
      </Button>
    </section>
  );
}
