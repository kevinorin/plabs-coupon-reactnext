import { Button } from "@mui/material";
import { MouseEvent, useCallback } from "react";

// Components
import { CouponCampaignCard } from "@components/coupon-campaign";

// Types
import { ICoupon } from "@typings/coupon.types";

// Styles
import * as SC from "./index.styles";


// TODO: Improve hardcoded styling, specifically sizing (not very responsive or well done!)

const CouponCard = (props) => {
  const { coupon, onClaim: _onClaim, onSelect } = props;

  const unclaimed = coupon.status === "unclaimed";

  /** Claim button handler (stop event propagation) */
  const onClaim = useCallback(
    (e) => {
      e?.stopPropagation();
      _onClaim?.();
    },
    [_onClaim]
  );

  /** Render claim button overlay (on unclaimed coupons) */
  const renderOverlay = () =>
    unclaimed && (
      <SC.CardImageOverlay>
        <Button onClick={onClaim}>Claim Coupon</Button>
      </SC.CardImageOverlay>
    );

  return <CouponCampaignCard item={coupon} overlay={renderOverlay()} onSelect={onSelect} />;
};

export default CouponCard;
