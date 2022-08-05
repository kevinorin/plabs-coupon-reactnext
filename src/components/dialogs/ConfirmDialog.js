import { LoadingButton } from "@mui/lab";
import { Breakpoint, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ReactNode } from "react";

const ConfirmDialog = (props) => {
  const {
    cancelText,
    children,
    confirmText,
    disabled = false,
    loading = false,
    open,
    title,
    width = "xs",
    onCancel,
    onConfirm,
  } = props;

  return (
    <Dialog maxWidth={width} sx={{ "& .MuiDialog-paper": { width: "100%" } }} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {onCancel && (
          <Button variant="text" onClick={onCancel}>
            {cancelText ?? "Cancel"}
          </Button>
        )}
        <LoadingButton disabled={disabled} loading={loading} onClick={onConfirm}>
          {confirmText ?? "Confirm"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
