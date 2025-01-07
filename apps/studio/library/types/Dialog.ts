import { ButtonProps, DialogProps } from "@mui/material";

export interface ButtonedDialogProps extends ButtonProps {
  buttonText?: string;
  dialogProps?: DialogProps;
}
