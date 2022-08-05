import { Stack } from "@mui/material";
import dayjs from "dayjs";
import { ReactNode } from "react";

// Components
import { PreviewImage, PreviewValue } from "@components/coupon-campaign/CouponCampaignPreview";

const CampaignPreview = (props) => {
  const { actions, campaign } = props;

  const dateFormat = "MMMM DD, YYYY";
  const maxWidth = 400;

  return (
    <Stack alignItems="center" sx={{ p: 4 }}>
      <PreviewImage imageUrl={campaign.imageUrl} label={campaign.name} maxWidth={maxWidth} />
      <Stack sx={{ maxWidth, width: "100%", mt: 2 }}>
        <PreviewValue label="Number in series">N/A</PreviewValue>
        <PreviewValue label="Active dates">
          {dayjs(campaign.startDate).format(dateFormat)} to {dayjs(campaign.endDate).format(dateFormat)}
        </PreviewValue>
        <PreviewValue label="Description" twoLines>
          {campaign.description ?? "N/A"}
        </PreviewValue>
        <PreviewValue label="Terms" twoLines>
          {campaign.terms ?? "N/A"}
        </PreviewValue>
      </Stack>
      {actions}
    </Stack>
  );
};

export default CampaignPreview;
