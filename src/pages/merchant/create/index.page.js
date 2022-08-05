import { LoadingButton } from "@mui/lab";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import { NextPage } from "next";
import * as Yup from "yup";
import { Stack, Typography, Grid } from "@mui/material";

// Components
import { AppPage } from "@components/layout";
import { FileUpload } from "@components/form";

// Utilities
import { useAuthGuard, useSnackbar } from "@hooks";

const validation = Yup.object({
  name: Yup.string().label("Business name").required().min(4),
  file: Yup.mixed()
    .label("Business Logo")
    .required()
    .test("fileType", "${label} is an invalid type", (v) => {
      // TODO: Fix issue with Formik-MUI wrapper that can clear selected image when cancelling selection!
      return ["image/jpg", "image/jpeg", "image/png"].includes(v?.type);
    })
    .test("fileSize", "${label} must be less than 10 MB", (v) => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      return v?.size <= maxSize;
    }),
  website: Yup.string().label("Business website").url(),
});

const initialValues = {
  name: "",
  file: null,
  website: "",
};

const MerchantCreate = () => {
  useAuthGuard({ requiresAuth: true });

  const { notifyError } = useSnackbar();

  /** Submit handler */
  const onSubmit = async (values, helpers) => {
    notifyError("Not implemented");

    // TODO: Set (and store) merchant display view
  };

  return (
    <AppPage tabTitle="Create a Merchant">
      <AppPage.Card variant="constrained" contentSx={{ p: 4 }} title="Setup Merchant Profile">
        <Stack spacing={2}>
          <Typography color="GrayText">
            Configure a merchant profile in order to create coupon campaigns and send to customers.
          </Typography>
          <Formik initialValues={initialValues} validationSchema={validation} onSubmit={onSubmit}>
            {({ isSubmitting, submitForm }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field component={TextField} label="Business Name" name="name" placeholder="ex. NFTee" />
                  </Grid>
                  <Grid item xs={12} mb={2}>
                    <Typography color="GrayText" sx={{ mb: 1 }}>
                      Upload Business Logo
                    </Typography>
                    <Field component={FileUpload} name="file" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      label="Business Website"
                      name="website"
                      placeholder="ex. http://nftee.com"
                    />
                  </Grid>
                </Grid>
                <LoadingButton loading={isSubmitting} fullWidth size="large" sx={{ mt: 2 }} onClick={submitForm}>
                  Continue
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </Stack>
      </AppPage.Card>
    </AppPage>
  );
};

export default MerchantCreate;
