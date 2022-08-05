import { TabContext, TabPanel } from "@mui/lab";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Components
import { AppPage } from "@components/layout";
import { AirdropCreate, AirdropPreview } from "./components/Airdrop";
import { LinkButton } from "@components/typography";

// Utilities
import { useAppSelector, useAuthGuard } from "@hooks";
import { selectCampaign } from "@store/slices/campaigns.slice";


/** need to set empty string so the form can render */
const initialValues = {
  emails: [""],
  phones: [""],
};

const CampaignAirDrop = () => {
  useAuthGuard({ requiresAuth: true });
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState("1");
  const [formData, setFormData] = useState(initialValues);

  const campaignId = router.query.cid;
  // NOTE: Invalid IDs are handled automatically by detecting invalid/missing campaign!
  const campaign = useAppSelector((state) => selectCampaign(state, campaignId));

  // Ensure valid campaign is present
  useEffect(() => {
    if (!campaign) {
      router.back();
    }
  }, [campaign, router]);

  /** Move to next step */
  const nextStep = () => {
    setCurrentStep(`${parseInt(currentStep, 10) + 1}`);
  };

  /** Move to previous step */
  const prevStep = () => {
    // NOTE: Must always ensure that the form at least has a blank entry when moving back!
    if (!formData.emails.length) {
      formData.emails[0] = "";
    }
    if (!formData.phones.length) {
      formData.phones[0] = "";
    }
    setCurrentStep(`${parseInt(currentStep, 10) - 1}`);
  };

  const pageTitle = currentStep !== "3" ? campaign?.name ?? "N/A" : undefined;

  return (
    <AppPage tabTitle="Airdrop Campaign">
      <AppPage.Card variant="constrained" title={pageTitle}>
        <TabContext value={currentStep}>
          <TabPanel value="1">
            <AirdropCreate formData={formData} setFormData={setFormData} nextStep={nextStep} />
          </TabPanel>
          <TabPanel value="2">
            <AirdropPreview formData={formData} prevStep={prevStep} nextStep={nextStep} />
          </TabPanel>
          <TabPanel value="3">
            <AppPage.Success message="Success! Coupon campaign has been airdropped.">
              <LinkButton to={"/merchant/dashboard"}>Back To Campaigns</LinkButton>
            </AppPage.Success>
          </TabPanel>
        </TabContext>
      </AppPage.Card>
    </AppPage>
  );
};

export default CampaignAirDrop;
