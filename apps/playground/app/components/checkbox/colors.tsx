import { Checkbox } from "@cubicsui/components";

export function Colors() {
  return (
    <section>
      <Checkbox label="Default" />
      <Checkbox label="Primary" color="primary" />
      <Checkbox label="Secondary" color="secondary" />
      <Checkbox label="Tertiary" color="tertiary" />
      <Checkbox label="Error" color="error" />
    </section>
  );
}
