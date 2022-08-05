import { Button, Stack } from "@mui/material";
import Image from "next/image";
import dayjs from "dayjs";

// Components
import { PreviewImage, PreviewValue } from "@components/coupon-campaign/CouponCampaignPreview";

// Types
import { ICoupon } from "@typings/coupon.types";


const CouponPreview = (props) => {
  const { coupon, onClaim } = props;

  const dateFormat = "MMMM DD, YYYY";
  const maxWidth = 300;

  return (
    <Stack alignItems="center" spacing={2}>
      <Stack maxHeight={40}>
        <Image src={coupon.merchant.logoUrl} alt="brand logo" width={150} height={100} objectFit="contain" />
      </Stack>
      <PreviewImage code={coupon.code} imageUrl={coupon.imageUrl} label={coupon.name} maxWidth={maxWidth} />
      <Stack sx={{ width: "100%", mt: 2 }}>
        <PreviewValue label="Series number">N/A</PreviewValue>
        <PreviewValue label="Expires">{dayjs(coupon.expiry).format(dateFormat)}</PreviewValue>
        <PreviewValue label="Description" twoLines>
          {coupon.description ?? "N/A"}
        </PreviewValue>
        <PreviewValue label="Terms" twoLines>
          {coupon.terms ?? "N/A"}
        </PreviewValue>
      </Stack>
      {coupon.status === "unclaimed" && (
        <Button sx={{ mt: 4 }} onClick={onClaim}>
          Claim Coupon
        </Button>
      )}
    </Stack>
  );
};

export default CouponPreview;
