import { Editor, EditorProps, Monaco } from "@monaco-editor/react";
import { Box, BoxProps, Paper, useColorScheme } from "@mui/material";
import React, {
  ComponentProps,
  CSSProperties,
  SetStateAction,
  useState,
} from "react";

export function onMountHandler(editor: any, monaco: Monaco) {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: "React",
    allowJs: true,
    typeRoots: ["node_modules/@types"],
  });

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    diagnosticCodesToIgnore: [
      // Cannot find module 'xxx' or its corresponding type declarations.
      2307,
      // Cannot find name 'React'.
      2304,
      // Property 'className' does not exist on type 'Props'
      2339,
    ],
  });

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    "<<react-definition-file>>",
    `file:///node_modules/@react/types/index.d.ts`
  );
}

export type CodeEditorProps = {
  name?: string;
  id?: string;
  boxProps?: BoxProps;
  textareaProps?: ComponentProps<"textarea">;
  height?: CSSProperties["height"];
  /** Use when the state is defined in the parent component */
  editorData?: string;
  /** Use when the state has to be set by the parent component */
  setEditorData?: (v: SetStateAction<string | undefined>) => void;
} & EditorProps;

export default function CodeEditor(props: CodeEditorProps) {
  const { mode } = useColorScheme();
  const {
    boxProps,
    name,
    id,
    height = "50vh",
    textareaProps,
    editorData: _editorData,
    setEditorData: _setEditorData,
    ...rest
  } = props;
  const [editorData, setEditorData] = useState<string | undefined>(
    props.defaultValue
  );
  return (
    <Box
      {...boxProps}
      height={height}
    >
      <textarea
        id={id}
        name={name}
        readOnly
        hidden
        value={_editorData ?? editorData}
        {...textareaProps}
      />
      <Editor
        value={_editorData ?? editorData}
        onChange={(v) =>
          _setEditorData ? _setEditorData(v) : setEditorData(v)
        }
        theme={mode == "dark" ? "vs-dark" : "vs-light"}
        height={"100%"}
        {...rest}
      />
    </Box>
  );
}
