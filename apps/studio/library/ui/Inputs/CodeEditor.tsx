import { Editor, EditorProps } from "@monaco-editor/react";
import { Box, BoxProps, Paper, useColorScheme } from "@mui/material";
import React, { ComponentProps, CSSProperties } from "react";

export type CodeEditorProps = {
  boxProps?: BoxProps;
  textareaProps?: ComponentProps<"textarea">;
  height: CSSProperties["height"];
} & EditorProps;

export default function CodeEditor(props: CodeEditorProps) {
  const { mode } = useColorScheme();
  const { boxProps, height, textareaProps, ...rest } = props;
  return (
    <Box
      component={Paper}
      overflow={"hidden"}
      height={height}
      border={(theme) => `1px solid ${theme.palette.divider}`}
      {...boxProps}
    >
      <textarea
        readOnly
        hidden
        {...textareaProps}
      />
      <Editor
        theme={mode == "dark" ? "vs-dark" : "vs-light"}
        height={"100%"}
        {...rest}
      />
    </Box>
  );
}
