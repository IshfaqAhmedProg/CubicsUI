import Form from "next/form";
import styles from "./page.module.scss";
import SubmitButton from "@/library/ui/Form/SubmitButton";
import { createComponentAction } from "./actions";

export default function CreatePage() {
  const formElements = [
    { label: "Component Name", id: "name" },
    { label: "Aliases", id: "aliases" },
    { label: "Description", id: "desc" },
    { label: "Categories", id: "categories" },
    { label: "Supported Environments", id: "supportedEnvs" },
    { label: "Component Code", id: "code" },
  ];

  return (
    <Form
      action={createComponentAction}
      className={styles.form}
    >
      {formElements.map((fe) => {
        return (
          <div
            key={fe.id}
            className={styles.inputField}
          >
            <label htmlFor={fe.id}>{fe.label}</label>
            {fe.id == "code" ? (
              <textarea
                id={fe.id}
                name={fe.id}
              />
            ) : (
              <input
                type="text"
                name={fe.id}
                id={fe.id}
              />
            )}
          </div>
        );
      })}
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
}
