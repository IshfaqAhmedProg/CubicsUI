import { TextAreaInput } from "@cubicsui/components";

export function Sizes() {
  return (
    <section>
      <TextAreaInput label="Extra Small" size="xs" />
      <TextAreaInput label="Small" size="sm" />
      <TextAreaInput label="Medium" size="md" />
      <TextAreaInput label="Large" size="lg" />
      <TextAreaInput label="Extra Large" size="xl" />
    </section>
  );
}
