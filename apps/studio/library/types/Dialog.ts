import { ButtonProps, DialogProps } from "@mui/material";

export interface ButtonedDialogProps extends ButtonProps {
  dialogProps?: DialogProps;
}
