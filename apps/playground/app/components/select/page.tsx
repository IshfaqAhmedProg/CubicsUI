import { Button, Select, TextInput } from "@cubicsui/components";
import styles from "../../page.module.css";
import { CubicsUIFavicon } from "@cubicsui/icons";
export default function Page() {
  const options = [
    <option value="first" key={"a"}>
      First Option
    </option>,
    <option value="first1" key={"a1"}>
      First1 Option
    </option>,
    <option value="second" key={"b"}>
      Second Option
    </option>,
    <option value="third" disabled key={"c"}>
      Third Option
    </option>,
  ];
  return (
    <div className={styles.root}>
      <h1>Select</h1>
      <Select label="Normal select">
        {options}
        <option value="long">Really long option with a lot of text</option>
        <optgroup label="Check">
          <option value="another one">Another Option</option>
        </optgroup>
      </Select>
      <Select label="With default value" defaultValue={"second"}>
        {options}
      </Select>
      <Select
        label="Multiple"
        multiple
        helperText={"Use ctrl+click to select multiple"}
      >
        {options}
        <option value="long">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste alias
          nemo sit temporibus eum maiores dignissimos voluptatum repellat nulla
          eaque reiciendis cum aspernatur quo error velit quam, consectetur
          nostrum rerum?
        </option>
      </Select>
      <Select startIcon={<CubicsUIFavicon />}>{options}</Select>
      <Select fullWidth startIcon={<CubicsUIFavicon />}>
        {options}
      </Select>
      <Select
        disablePadding
        startIcon={
          <Button icon>
            <CubicsUIFavicon />
          </Button>
        }
      >
        {options}
      </Select>
    </div>
  );
}
