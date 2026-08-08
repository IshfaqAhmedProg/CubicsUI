import { TextInput } from "@cubicsui/components";

export function DisableInputWidth() {
  return (
    <section>
      <h3>Final width calculated from label</h3>
      <TextInput label="tiny" disableInputWidth />
      <h3>Final width calculated from helperText</h3>
      <TextInput label="tiny" disableInputWidth helperText={"tinier"} />
    </section>
  );
}
