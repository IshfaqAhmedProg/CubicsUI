import type { SubmitEvent } from "react";

export function alertFormData(e: SubmitEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  alert(JSON.stringify(Object.fromEntries(formData.entries())));
}
