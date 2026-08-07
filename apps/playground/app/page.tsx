import styles from "./page.module.css";
import Link from "next/link";
export default function Page() {
  return (
    <div className={styles.root}>
      <h1>Components</h1>
      <h2>Inputs</h2>
      <ol>
        <li>
          <h3>
            <Link href={"/components/button"}>Button</Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link href={"/components/checkbox"}>Checkbox</Link>
          </h3>
        </li>
      </ol>
    </div>
  );
}
