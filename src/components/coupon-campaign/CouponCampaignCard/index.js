import { Box, Card, CardActionArea, CardContent, Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { ReactNode } from "react";

// Components
import { StatusChip } from "@components/typography";

// Utilities
import { getHoverStyles } from "@utils/styles.util";

// Styles
import * as SC from "./index.styles";

// TODO: Improve hardcoded styling, specifically sizing (not very responsive or well done!)

const CouponCampaignCard = (props) => {
  const { actions, item, overlay, onSelect } = props;

  // NOTE: Will either have an expiry or end date!
  // @ts-ignore
  const endDate = item.expiry ?? item.endDate;
  const expiry = endDate ? dayjs(endDate).format("MMM DD, YYYY") : "N/A";
  const logoSize = 40;

  const hoverStyles = getHoverStyles(Boolean(onSelect));

  return (
    <Card sx={hoverStyles}>
      <CardActionArea component="div" disabled={!onSelect} onClick={onSelect}>
        <SC.CardImage>
          {/* Images should maintain a 3x2 aspect ratio (and use "cover" method for overflow) */}
          {item.imageUrl && <Image alt="Coupon image" height={200} objectFit="cover" src={item.imageUrl} width={300} />}
          {overlay}
          {item.status && <StatusChip status={item.status} sx={{ position: "absolute", top: 12, left: 12 }} />}
        </SC.CardImage>
        <Divider />
        <CardContent sx={{ p: 1, pb: "8px !important" }}>
          <SC.CardFooter>
            <SC.CardFooterLogo size={logoSize}>
              {item.merchant.logoUrl && (
                <Image
                  alt="Coupon image"
                  height={logoSize}
                  objectFit="contain"
                  src={item.merchant.logoUrl}
                  width={logoSize}
                />
              )}
            </SC.CardFooterLogo>
            <Stack>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2">Expires: {expiry}</Typography>
            </Stack>
            {actions && <Box sx={{ ml: "auto" }}>{actions}</Box>}
          </SC.CardFooter>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CouponCampaignCard;
