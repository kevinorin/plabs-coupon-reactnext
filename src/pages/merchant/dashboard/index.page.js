import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Components
import { CampaignCard, CampaignEndDialog } from "@components/campaign";
import { AppPage } from "@components/layout";
import { TheAppDrawer } from "@components/single";
import { EmptyPrompt, SectionHeader } from "@components/typography";

// Utilities
import { useAppSelector, useAuthGuard, useSnackbar } from "@hooks";
import { selectCampaignsByStatus } from "@store/slices/campaigns.slice";
import { selectViewedMerchant } from "@store/slices/merchant.slice";


const MerchantDashboard = () => {
  useAuthGuard({ requiresAuth: true });

  const router = useRouter();
  const { notifyError } = useSnackbar();

  // Use state to track the campaign selected for "ending" confirmation
  // which can then be checked for boolean (truthy) value to determine whether the confirmation dialog should be shown or not.
  const [campaignToEnd, setCampaignToEnd] = useState<ICampaign | null>(null);

  const viewedMerchant = useAppSelector(selectViewedMerchant);

  const activeCampaigns = useAppSelector((state) => selectCampaignsByStatus(state, ["draft", "active"]));
  const pastCampaigns = useAppSelector((state) => selectCampaignsByStatus(state, "ended"));

  // TODO: Move to a re-usable hook (similar to auth hook)?
  // Ensure merchant is selected on page
  useEffect(() => {
    if (viewedMerchant) return;

    router.replace({
      pathname: "/customer/dashboard",
    });
  }, [router, viewedMerchant]);

  /** Card selection handler */
  const onCardSelect = (campaign) => {
    router.push({
      pathname: `/merchant/campaign/${campaign.id}`,
    });
  };

  const onCampaignEndCancel = () => {
    setCampaignToEnd(null);
  };

  const onCampaignEndConfirm = () => {
    // TODO: Send API request to end item

    notifyError("Not implemented yet");
    setCampaignToEnd(null);
  };

  return (
    <AppPage left={<TheAppDrawer view="merchant" />} tabTitle="Dashboard">
      <CampaignEndDialog
        campaign={campaignToEnd}
        open={Boolean(campaignToEnd)}
        onCancel={onCampaignEndCancel}
        onEnd={onCampaignEndConfirm}
      />
      <AppPage.Body>
        <SectionHeader>Active Campaigns</SectionHeader>
        {!activeCampaigns.length && <EmptyPrompt text="You don't have any campaigns yet" />}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {activeCampaigns.map((campaign) => (
            <Grid key={campaign.id} item xs={12} sm={6} md={4} lg={3}>
              <CampaignCard
                campaign={campaign}
                onEndCampaign={() => setCampaignToEnd(campaign)}
                onSelect={() => onCardSelect(campaign)}
              />
            </Grid>
          ))}
        </Grid>
        <SectionHeader>Past Campaigns</SectionHeader>
        {!pastCampaigns.length && <EmptyPrompt text="You don't have any past campaigns" />}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {pastCampaigns.map((campaign) => (
            <Grid key={campaign.id} item xs={12} sm={6} md={4} lg={3}>
              <CampaignCard campaign={campaign} onSelect={() => onCardSelect(campaign)} />
            </Grid>
          ))}
        </Grid>
      </AppPage.Body>
    </AppPage>
  );
};

export default MerchantDashboard;
