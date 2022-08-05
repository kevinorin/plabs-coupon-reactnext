import { Typography } from "@mui/material";

// Components
import { ConfirmDialog } from "@components/dialogs";

const CouponClaimDialog = (props) => {
  const { coupon, open, onCancel, onClaim } = props;

  return (
    <ConfirmDialog open={open} title="Claim Coupon?" onCancel={onCancel} onConfirm={onClaim}>
      Are you sure you wish to claim this coupon?
      <Typography sx={{ mt: 1, fontWeight: "bold" }}>{coupon?.name}</Typography>
    </ConfirmDialog>
  );
};

export default CouponClaimDialog;
