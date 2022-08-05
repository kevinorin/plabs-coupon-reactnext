import { SxProps, Theme } from "@mui/material";

// Types
// import { CampaignStatus, CouponStatus } from "@typings/coupon.types";

// Styles
import * as SC from "./index.styles";

const StatusChipMap = {
  active: {
    backgroundColor: "#30B4FF",
    label: "Active",
    labelColor: "white",
  },
  ended: {
    backgroundColor: "#E5D0FF",
    label: "Ended",
  },
  expired: {
    backgroundColor: "#E5D0FF",
    label: "Expired",
  },
  unclaimed: {
    backgroundColor: "#FFAE73",
    label: "Unclaimed",
  },
  draft: {
    backgroundColor: "#9E9E9E",
    label: "Draft",
  },
};

/** Coupon status display chip */
const StatusChip = (props) => {
  const { absolute = false, status, sx } = props;

  const chipConfig = StatusChipMap[status];

  return (
    <SC.StatusChip
      absolute={absolute}
      backgroundColor={chipConfig.backgroundColor}
      // @ts-ignore
      sx={sx}
      textColor={chipConfig.labelColor}
    >
      {chipConfig.label}
    </SC.StatusChip>
  );
};

export default StatusChip;
