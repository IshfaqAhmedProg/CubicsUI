import { TextInput } from "@cubicsui/components";

export function Disabled() {
  return (
    <section>
      <TextInput label="Disabled TextInput" disabled />
      <TextInput
        label="Disabled TextInput"
        defaultValue={"This is disabled"}
        disabled
      />
    </section>
  );
}
