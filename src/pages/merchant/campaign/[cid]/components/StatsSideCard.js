import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useSnackbar } from "@hooks";

// Components
import { StatusChip } from "@components/typography";
import { ConfirmDialog } from "@components/dialogs";

// Utilities
import couponImageBeer1 from "@public/dummy/coupon_beer_1.png";

// Styles
import * as SC from "./index.styles";

const StatsSideCard = (props) => {
  const { onAirdropCoupon, onEndCampaign } = props;

  const [showCouponStatusDialog, setShowCouponStatusDialog] = useState(false);

  const { notifyError } = useSnackbar();

  const accordionSx = {
    "&.MuiAccordion-root": {
      "border-radius": 2,
      "&:before": {
        display: "none",
      },
    },
  };

  const onSetActive = () => {
    setShowCouponStatusDialog(false);
    notifyError("Not implemented yet");
  };

  const onCancelSetActive = () => {
    setShowCouponStatusDialog(false);
  };

  return (
    <Stack spacing={2}>
      <ConfirmDialog
        open={showCouponStatusDialog}
        title="Set Status to Active?"
        onCancel={onCancelSetActive}
        onConfirm={onSetActive}
      >
        Are you sure you wish to set the coupon status to active?
      </ConfirmDialog>
      <Card variant="outlined">
        <SC.CardImage>
          <Image alt="Subscription image" height={200} objectFit="cover" src={couponImageBeer1} width={300} />
          <StatusChip status="active" sx={{ position: "absolute", top: 12, left: 12 }} />
        </SC.CardImage>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
          sx={{ p: 2 }}
          spacing={2}
        >
          <Typography sx={{ mt: 1 }} variant="body1">
            <strong>10% Off Custom NFTee Shirt</strong>
          </Typography>
        </Stack>
      </Card>
      <Button
        onClick={() => {
          setShowCouponStatusDialog(true);
        }}
      >
        Set Active
      </Button>
      <Button onClick={onAirdropCoupon}>Airdrop Coupon</Button>
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            <strong>Description</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            <strong>Terms</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Button color="error" onClick={onEndCampaign}>
        End Program
      </Button>
    </Stack>
  );
};

export default StatsSideCard;
