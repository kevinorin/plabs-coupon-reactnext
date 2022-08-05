import { Button, Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ChevronLeft as BackIcon } from "@mui/icons-material";

// Components
import { SummaryCard, StatsHistoryChart, StatsHistoryTable, StatsSideCard } from "./components";
import { AppPage } from "@components/layout";
import { CampaignEndDialog } from "@components/campaign";

// Utilities
import { useAppSelector, useAuthGuard, useSnackbar } from "@hooks";
import { selectCampaign } from "@store/slices/campaigns.slice";

const CampaignDetails = () => {
  useAuthGuard({ requiresAuth: true });

  const router = useRouter();
  const { notifyError } = useSnackbar();

  const campaignId = router.query.cid;
  // NOTE: Invalid IDs are handled automatically by detecting invalid/missing campaign!
  const campaign = useAppSelector((state) => selectCampaign(state, campaignId));

  const [showEndCampaignDialog, setShowEndCampaignDialog] = useState(false);

  // Ensure valid campaign is present
  useEffect(() => {
    if (!campaign) {
      router.back();
    }
  }, [campaign, router]);

  /** End campaign confirmation callback */
  const onEndCampaign = () => {
    setShowEndCampaignDialog(false);

    notifyError("Not implemented yet");
  };

  const handleAirdropCoupon = () => {
    router.push({
      pathname: `/merchant/campaign/${campaignId}/airdrop`,
    });
  };

  const handleEndCampaignDialog = () => {
    setShowEndCampaignDialog(true);
  };

  return (
    <AppPage tabTitle="Campaign Preview">
      <CampaignEndDialog
        campaign={campaign ?? null}
        open={showEndCampaignDialog}
        onCancel={() => setShowEndCampaignDialog(false)}
        onEnd={onEndCampaign}
      />
      <AppPage.Body>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={10} sx={{ pt: "0 !important" }}>
            <Button startIcon={<BackIcon />} onClick={() => router.back()}>
              Back
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <StatsSideCard onAirdropCoupon={handleAirdropCoupon} onEndCampaign={handleEndCampaignDialog} />
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack spacing={2}>
              <SummaryCard />
              <StatsHistoryChart />
              <StatsHistoryTable />
            </Stack>
          </Grid>
        </Grid>
      </AppPage.Body>
    </AppPage>
  );
};

export default CampaignDetails;
