import React from "react";
import HiddenInput from "../HiddenInput";
import { useComponentForm } from "@/app/components/create/providers";

export default function ComponentFormHiddenInputs() {
  const { project, component, codeblocks } = useComponentForm();
  return (
    <>
      {codeblocks && (
        <HiddenInput
          value={codeblocks.id}
          name="cbId"
        />
      )}
      {component && (
        <HiddenInput
          value={component.id}
          name="cmpId"
        />
      )}
      <HiddenInput
        value={project.id}
        name="prId"
      />
    </>
  );
}
