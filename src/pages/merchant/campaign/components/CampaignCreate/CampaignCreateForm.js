import { LoadingButton } from "@mui/lab";
import { Grid, Stack, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField, CheckboxWithLabel } from "formik-mui";
import { DatePicker } from "formik-mui-lab";
import * as Yup from "yup";
import { Dispatch, SetStateAction } from "react";

// Utilities
import { sleep } from "@utils/sleep.util";

// Types
import { ICreateAccountForm } from "../../create/index.page";
import { FileUpload } from "@components/form";

const validation = Yup.object().shape({
  name: Yup.string().label("Coupon name").required(),
  code: Yup.string().label("Code").required(),
  file: Yup.mixed()
    .label("Coupon image")
    .required()
    .test("fileType", "${label} is an invalid type", (v) => {
      // TODO: Fix issue with Formik-MUI wrapper that can clear selected image when cancelling selection!
      return ["image/jpg", "image/jpeg", "image/png"].includes(v?.type);
    })
    .test("fileSize", "${label} must be less than 10 MB", (v) => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      return v?.size <= maxSize;
    }),
  series: Yup.number().label("Series").integer().moreThan(0).required(),
  startDate: Yup.date().label("Start date").typeError("${label} must be a valid date").required(),
  endDate: Yup.date()
    .label("End date")
    .min(Yup.ref("startDate"), "${label} can't be before start date")
    .typeError("${label} must be a valid date")
    .required(),
  description: Yup.string().label("Description"),
  terms: Yup.string().label("Terms"),
  draft: Yup.boolean().label("Draft"),
});

const CampaignCreateForm = (props) => {
  const { nextStep, formData, setFormData } = props;

  /** Submit handler */
  const onSubmit = async (values) => {
    // DEBUG
    await sleep(1000);

    setFormData(values);
    nextStep();
  };

  return (
    <Formik initialValues={formData} validationSchema={validation} onSubmit={onSubmit}>
      {({ isSubmitting, submitForm }) => (
        <Stack>
          <Typography sx={{ mb: 2 }} variant="h3">
            Add Coupon Details
          </Typography>
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <Field autoFocus component={TextField} label="Coupon Name" name="name" />
                <Typography variant="caption">
                  Create a name for your NFT coupon campaign. Your customers will be able to see this information.
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Field component={TextField} label="Coupon Code" name="code" placeholder="10% OFF" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field component={TextField} label="Number in Series" name="series" type="number" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field component={DatePicker} name="startDate" label="Coupon Start Date" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field component={DatePicker} name="endDate" label="Coupon End Date" />
              </Grid>
              <Grid item xs={12}>
                <Field component={FileUpload} name="file" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  label="Coupon Description"
                  name="description"
                  placeholder="Describe your NFT coupon campaign."
                  InputProps={{ multiline: true, rows: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  label="Coupon Terms"
                  name="terms"
                  placeholder="Describe the terms associated with your NFT coupon campaign. "
                  InputProps={{ multiline: true, rows: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="draft"
                  Label={{ label: "Draft Campaign - (will not be visible until marked as active)" }}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={2} sx={{ pt: 2 }}>
              <Grid item>
                <LoadingButton fullWidth loading={isSubmitting} onClick={submitForm}>
                  Next
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        </Stack>
      )}
    </Formik>
  );
};

export default CampaignCreateForm;
