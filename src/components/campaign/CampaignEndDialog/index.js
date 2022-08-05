import { Typography } from "@mui/material";

// Components
import { ConfirmDialog } from "@components/dialogs";

const CouponClaimDialog = (props) => {
  const { campaign, open, onCancel, onEnd } = props;

  return (
    <ConfirmDialog open={open} title="End Campaign" onCancel={onCancel} onConfirm={onEnd}>
      Are you sure you wish to end this campaign?
      <Typography sx={{ mt: 1, fontWeight: "bold" }}>{campaign?.name}</Typography>
    </ConfirmDialog>
  );
};

export default CouponClaimDialog;
