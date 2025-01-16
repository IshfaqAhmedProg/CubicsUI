"use client";
import { Stack, FormLabel, Switch } from "@mui/material";
import CollapsibleSection from "@/library/ui/Layout/CollapsibleSection";
import CodeEditor, { onMountHandler } from "@/library/ui/Inputs/CodeEditor";
import DependencySection from "../DependencyTable/DependencySection";
import { useComponentForm } from "@/app/components/create/providers";

export default function ComponentScripts() {
  const {
    name,
    scriptCode,
    setScriptCode,
    setStyleCode,
    outPath,
    project,
    styleCode,
    scriptIncludesStyles,
    setScriptIncludesStyles,
  } = useComponentForm();

  const scriptName = () => {
    const paths = outPath.split("/");
    return paths[paths.length - 1];
  };
  return (
    <CollapsibleSection
      title="Scripts"
      expanded
    >
      <Stack gap={3}>
        <FormLabel htmlFor="script">
          Paste the code that defines your component below,
        </FormLabel>
        <CodeEditor
          id="script"
          name="script"
          editorData={scriptCode}
          path={scriptName()}
          setEditorData={(v) => setScriptCode(v)}
          language={project.lang.toLowerCase()}
          onMount={onMountHandler}
        />

        <DependencySection />
        <Stack
          direction={"row"}
          gap={3}
          alignItems={"center"}
        >
          <FormLabel htmlFor="scriptIncludesStyles">
            Does the component include styles?
          </FormLabel>
          <Switch
            id="scriptIncludesStyles"
            checked={scriptIncludesStyles}
            onChange={() => setScriptIncludesStyles(!scriptIncludesStyles)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Stack>
        <CollapsibleSection
          title="Styles"
          expanded={scriptIncludesStyles}
          disabled={!scriptIncludesStyles}
        >
          {scriptIncludesStyles && (
            <Stack gap={2}>
              <FormLabel>
                Paste the style definitions for the component defined above,
              </FormLabel>
              <CodeEditor
                name="styles"
                editorData={styleCode}
                path={`${name}.${project.styleEng}`}
                setEditorData={(v) => setStyleCode(v)}
                language={project.styleEng}
              />
            </Stack>
          )}
        </CollapsibleSection>
      </Stack>
    </CollapsibleSection>
  );
}
