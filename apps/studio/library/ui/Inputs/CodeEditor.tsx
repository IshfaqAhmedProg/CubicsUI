import { Editor, EditorProps } from "@monaco-editor/react";
import { Box, BoxProps, Paper, useColorScheme } from "@mui/material";
import React, { ComponentProps, CSSProperties, useState } from "react";

export type CodeEditorProps = {
  name?: string;
  id?: string;
  boxProps?: BoxProps;
  textareaProps?: ComponentProps<"textarea">;
  height?: CSSProperties["height"];
} & EditorProps;

export default function CodeEditor(props: CodeEditorProps) {
  const { mode } = useColorScheme();
  const { boxProps, name, id, height = "50vh", textareaProps, ...rest } = props;
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
        value={editorData}
        {...textareaProps}
      />
      <Editor
        value={editorData}
        onChange={(v) => setEditorData(v)}
        theme={mode == "dark" ? "vs-dark" : "vs-light"}
        height={"100%"}
        {...rest}
      />
    </Box>
  );
}
