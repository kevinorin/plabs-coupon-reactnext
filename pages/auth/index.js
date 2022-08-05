import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Box, Paper, Tab, Typography } from "@mui/material";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useState } from "react";

// Components
// import { TextFieldNearSuffix } from "@components/form";
import { AuthLayout } from "./components";
import AuthLayoutPromptConditions from "./components/AuthLayout/AuthLayoutPromptConditions";


const loginValidation = Yup.object({
  walletId: Yup.string().label("Account ID").required().min(4),
});

const signupValidation = Yup.object().shape(
  {
    email: Yup.string()
      .label("Email")
      .email()
      .when("phone", {
        is: (phone) => !phone || !phone.length,
        then: (schema) => schema.required(),
      }),
    phone: Yup.string()
      .label("Phone")
      .when("email", {
        is: (email) => !email || !email.length,
        then: (schema) =>
          schema.required().test("digits", "${label} must be at least 10 digits", (v) => /^\d{10,}$/.test(v ?? "")),
      }),
  },
  [["email", "phone"]]
);

const loginInitialValues = {
  walletId: "",
};

const signupInitialValues = {
  email: "",
  phone: "",
};

const AuthPage = () => {
  // useAuthGuard({ requiresNoAuth: true });

  // const { notifyError } = useSnackbar();
  // const { getError } = useErrors();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("email");

  const initialFocus = router.query.focusSignIn ? "signin" : "signup";
  const { walletSuffix } = 'config.api';

  /** Handle changing tabs */
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  /** Submit handler */
  const onSubmitSignup = async (values, helpers) => {
    helpers.setSubmitting(false);

    router.push({
      pathname: "/auth/signup/details",
      query: { email: values.email, phone: values.phone },
    });
  };

  /** Submit handler */
  const onSubmitLogin = async (values, helpers) => {
    try {
      const otpData = await AuthService.login({
        walletId: `${values.walletId}.${walletSuffix}`,
      });

      const { email, phone, walletId } = otpData;

      router.push({
        pathname: "/auth/login/verify",
        query: {
          walletId,
          recipient: phone ?? email,
          redirectUrl: router.query.redirectUrl,
        },
      });
    } catch (e) {
      notifyError(getError(e, "Error while authenticating"));
      helpers.setSubmitting(false);

      return;
    }
  };

  return (
    <AuthLayout>
      <Paper sx={{ p: 4, mt: 2 }}>
        <Formik initialValues={signupInitialValues} validationSchema={signupValidation} onSubmit={onSubmitSignup}>
          {({ dirty, isSubmitting, isValid, submitForm }) => (
            <AuthLayout.Content>
              <Typography sx={{ mb: 0.5, textAlign: "center" }} variant="h3">
                Sign up with PrimeLab
              </Typography>
              <Typography sx={{ mb: 0.5, textAlign: "center" }} variant="body1">
                Register with your email or mobile for 2-step verification.
              </Typography>
              <Form>
                <TabContext value={currentTab}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList centered variant="fullWidth" onChange={handleTabChange}>
                      <Tab label="Email" value="email" />
                      <Tab label="Phone" value="phone" />
                    </TabList>
                  </Box>
                  <TabPanel sx={{ px: 0 }} value="email">
                    <Field
                      autoFocus={initialFocus === "signup"}
                      component={TextField}
                      label="Email Address"
                      name="email"
                    />
                  </TabPanel>
                  <TabPanel sx={{ px: 0 }} value="phone">
                    <Box sx={{ display: "flex" }}>
                      <Field
                        component={TextField}
                        defaultValue="+1"
                        disabled
                        hiddenLabel
                        name="countryCode"
                        sx={{
                          flexShrink: 0,
                          width: "6ch",
                          pr: 1,
                        }}
                      />
                      <Field
                        component={TextField}
                        helperText="Phone OTP codes do not work currently!"
                        label="Phone Number"
                        name="phone"
                        sx={{ flexGrow: 1 }}
                      />
                    </Box>
                  </TabPanel>
                </TabContext>
                <LoadingButton
                  disabled={!dirty || !isValid}
                  fullWidth
                  loading={isSubmitting}
                  size="large"
                  onClick={submitForm}
                >
                  Continue
                </LoadingButton>
              </Form>
              {/* < /> */}
              </AuthLayout.Content>
          )}
        </Formik>
      </Paper>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Formik initialValues={loginInitialValues} validationSchema={loginValidation} onSubmit={onSubmitLogin}>
          {({ dirty, isSubmitting, isValid, submitForm }) => (
            <AuthLayout.Content>
              <Typography sx={{ mb: 2, textAlign: "center" }} variant="h3">
                Sign in
              </Typography>
              <Typography sx={{ mb: 2, textAlign: "center" }} variant="body1">
                Sign in with an existing PrimeLab account
              </Typography>
              <Form>
                <Field
                  autoFocus={initialFocus === "signin"}
                  component={TextField}
                  // InputProps={}
                  label="Account ID"
                  name="walletId"
                />
                <LoadingButton
                  disabled={!dirty || !isValid}
                  loading={isSubmitting}
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  onClick={submitForm}
                >
                  Sign In
                </LoadingButton>
              </Form>
              </AuthLayout.Content>
          )}
        </Formik>
      </Paper>
      </AuthLayout>
  );
};

export default AuthPage;
