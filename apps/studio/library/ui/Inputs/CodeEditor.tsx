import { Editor, EditorProps } from "@monaco-editor/react";
import { Box, BoxProps, Paper, useColorScheme } from "@mui/material";
import React, {
  ComponentProps,
  CSSProperties,
  SetStateAction,
  useState,
} from "react";

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
      component={Paper}
      overflow={"hidden"}
      height={height}
      border={(theme) => `1px solid ${theme.palette.divider}`}
      {...boxProps}
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
