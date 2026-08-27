"use client";

import {
  Button,
  Checkbox,
  CheckboxGroupControl,
  CheckboxProvider,
} from "@cubicsui/components";
import { alertFormData } from "@/lib/utils/alertFormData";

export function InGroup() {
  return (
    <section>
      <ul>
        <li>
          Make sure to pass a unique name to each <code>{"<Checkbox/>"}</code>{" "}
          when using in a group as that will be used to identify the checkbox in
          the group.
        </li>
        <li>
          If a name is passed to <code>{"<CheckboxGroupControl/>"}</code> then
          that will show up in FormData too along with the other checkboxes
        </li>
        <li>
          <code>{"<CheckboxGroupControl/>"}</code> will always skip group by
          default and wont show up in values inside{" "}
          <code>{"<CheckboxProvider/>"}</code>, when using useCheckbox
        </li>
      </ul>

      <h3>With Form</h3>
      <form onSubmit={alertFormData}>
        <div className={"column"}>
          <CheckboxProvider>
            <CheckboxGroupControl size="sm" label="Select All" />
            <Checkbox label="Form Checkbox 1" name="form-checkbox-1" />
            <Checkbox label="Form Checkbox 2" name="form-checkbox-2" />
            <Checkbox label="Form Checkbox 3" name="form-checkbox-3" />
            <Checkbox label="Form Checkbox 4" name="form-checkbox-4" />
          </CheckboxProvider>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
      <h3>Without Form</h3>
      <div className={"column"}>
        <CheckboxProvider>
          <CheckboxGroupControl size="sm" label="Select All" />
          <Checkbox label="Group Checkbox 1" name="group-checkbox-1" />
          <Checkbox label="Group Checkbox 2" name="group-checkbox-2" />
        </CheckboxProvider>
      </div>
    </section>
  );
}
