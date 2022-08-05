import { Box, Button, Card, Checkbox, FormGroup, FormControlLabel, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";

// Utilities
import { sleep } from "@utils/sleep.util";

const CampaignPreview = (props) => {
  const { nextStep, prevStep, formData } = props;

  const onSubmit = async () => {
    await sleep(1000);
    // go to next step
    nextStep();
  };

  const dateFormat = "MMMM DD, YYYY";
  const file = formData?.file instanceof File ? URL.createObjectURL(formData.file) : "";
  const maxWidth = 400;

  return (
    <Stack>
      <Typography sx={{ mb: 4 }} textAlign="center" variant="h3">
        Preview
      </Typography>
      <Stack alignItems="center">
        <Card variant="outlined">
          {file && (
            <Image alt="Coupon image" height={(maxWidth * 2) / 3} src={file} objectFit="cover" width={maxWidth} />
          )}
          <Typography sx={{ p: 1, pt: 0.5 }} variant="body1">
            {formData.code}
          </Typography>
        </Card>
        <Stack sx={{ maxWidth, width: "100%", mt: 2 }}>
          <Typography sx={{ mt: 1 }} variant="body1">
            <strong>Coupon Name:</strong> {formData.name}
          </Typography>
          <Typography sx={{ mt: 1 }} variant="body1">
            <strong>Number in series:</strong> {formData.series}
          </Typography>
          <Typography sx={{ mt: 1 }} variant="body1">
            <strong>Active dates: </strong>
            {dayjs(formData.startDate).format(dateFormat)}
            &thinsp;&ndash;&thinsp;
            {dayjs(formData.endDate).format(dateFormat)}
          </Typography>
          <Typography sx={{ mt: 1 }} variant="body1">
            <strong>Description</strong>
            <br />
            {formData.description || "N/A"}
          </Typography>
          <Typography sx={{ mt: 1 }} variant="body1">
            <strong>Terms</strong>
            <br />
            {formData.terms || "N/A"}
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Draft Campaign" checked={formData.draft} />
          </FormGroup>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button onClick={prevStep} variant="text">
              back
            </Button>
            <Button onClick={onSubmit}>Publish</Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CampaignPreview;
