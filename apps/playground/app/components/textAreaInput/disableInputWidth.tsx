import { TextAreaInput } from "@cubicsui/components";

export function DisableInputWidth() {
  return (
    <section>
      <p>Removes min-width of 20ch</p>
      <h3>Final width calculated from label</h3>
      <TextAreaInput label="tiny" disableInputWidth />
      <h3>Final width calculated from helperText</h3>
      <TextAreaInput label="tiny" disableInputWidth helperText={"tinier"} />
    </section>
  );
}
