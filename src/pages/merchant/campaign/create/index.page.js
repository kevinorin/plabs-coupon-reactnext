import { useAuthGuard } from "@hooks";
import { TabContext, TabPanel } from "@mui/lab";
import { useState } from "react";

// Components
import { AppPage } from "@components/layout";
import { CampaignCreateForm, CampaignPreview, CampaignAction } from "../components/CampaignCreate";

const today = new Date();
const futureDate = new Date();
futureDate.setMonth(today.getMonth() + 10);
const initialValues = {
  name: "",
  code: "",
  series: null,
  file: null,
  startDate: today,
  endDate: futureDate,
  description: "",
  terms: "",
  draft: true,
};

const Campaign = () => {
  useAuthGuard({ requiresAuth: true });
  const [currentStep, setCurrentStep] = useState("1");
  const [formData, setFormData] = useState(initialValues);

  const nextStep = () => {
    setCurrentStep(`${parseInt(currentStep, 10) + 1}`);
  };
  const prevStep = () => {
    setCurrentStep(`${parseInt(currentStep, 10) - 1}`);
  };

  return (
    <AppPage tabTitle="Create Campaign">
      <AppPage.Card variant="form" title="Create Campaign">
        <TabContext value={currentStep}>
          <TabPanel value="1">
            <CampaignCreateForm formData={formData} setFormData={setFormData} nextStep={nextStep} />
          </TabPanel>
          <TabPanel value="2">
            <CampaignPreview formData={formData} nextStep={nextStep} prevStep={prevStep} />
          </TabPanel>
          <TabPanel value="3">
            <CampaignAction formData={formData} nextStep={nextStep} />
          </TabPanel>
        </TabContext>
      </AppPage.Card>
    </AppPage>
  );
};

export default Campaign;
