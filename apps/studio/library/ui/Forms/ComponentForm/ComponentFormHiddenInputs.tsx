import HiddenInput from "../../Inputs/HiddenInput";
import { useComponentForm } from "@/library/contexts/ComponentFormContext";

export default function ComponentFormHiddenInputs() {
  const { library, component, codeblocks } = useComponentForm();
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
        value={library.id}
        name="libId"
      />
    </>
  );
}
