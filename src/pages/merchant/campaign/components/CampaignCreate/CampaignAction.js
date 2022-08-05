import { CheckCircleOutlineOutlined as CheckIcon } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

// Utilities
import { useSnackbar } from "@hooks";

const CampaignAction = (props) => {
  const { nextStep, formData } = props;

  const { notifyError } = useSnackbar();

  return (
    <Stack alignItems="center">
      <CheckIcon color="primary" sx={{ fontSize: 100 }} />
      <Typography sx={{ color: "primary.main", mb: 4, mt: 3 }} variant="h3">
        Coupon created successfully
      </Typography>
      <Button onClick={() => notifyError("Not implemented")}>Airdrop Coupon</Button>
    </Stack>
  );
};

export default CampaignAction;
