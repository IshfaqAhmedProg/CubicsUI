import {
  Checkbox,
  CheckboxGroupControl,
  CheckboxProvider,
} from "@cubicsui/components";

export function CustomIcons() {
  return (
    <section>
      <Checkbox checkedIcon={<>✔</>} label="Custom checked icon" />
      <hr />
      <CheckboxProvider>
        <CheckboxGroupControl
          indeterminateIcon={<>≡</>}
          checkedIcon={<>✔</>}
          label="Custom indeterminate icon"
        />
        <Checkbox checkedIcon={<>✔</>} label="Custom checked icon" name="a" />
        <Checkbox checkedIcon={<>✔</>} label="Custom checked icon" name="b" />
        <Checkbox checkedIcon={<>✔</>} label="Custom checked icon" name="c" />
      </CheckboxProvider>
    </section>
  );
}
