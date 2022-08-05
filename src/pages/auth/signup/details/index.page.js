import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import * as Yup from "yup";

// Components
import { TextFieldNearSuffix } from "@components/form";
import { AuthLayout, AuthLayoutPromptLogin } from "@pages/auth/components";

// Utilities
import config from "@config";
import { useAuthGuard, useErrors, useSnackbar } from "@hooks";
import { AuthService } from "@services";

const validation = Yup.object().shape({
  accountId: Yup.string().label("Account ID").required(),
  fullName: Yup.string()
    .label("Full name")
    .required()
    .test("name", "${label} must be a full name", (v) => /^\w{2,}\s\w{2,}[\w\s]*$/.test(v ?? "")),
});

const initialValues = {
  accountId: "",
  fullName: "",
};

const CreateCustomer = () => {
  useAuthGuard({ requiresNoAuth: true });

  const router = useRouter();
  const { getError } = useErrors();

  const { walletSuffix } = config.api;

  // NOTE: Prefill wallet name with email
  let rawAccountId = "";
  if (router.query.email) {
    rawAccountId = `${router.query.email}`;
    rawAccountId = rawAccountId.substring(0, rawAccountId.lastIndexOf("@")).replace(/[\W_]+/g, "");
  }
  initialValues.accountId = rawAccountId;

  const { notifyError } = useSnackbar();

  /** Submit handler */
  const onSubmit = async (values, helpers) => {
    const name = values.fullName.split(" ");
    const firstName = name[0] ?? "";
    const lastName = name.splice(1).join(" ") ?? "";
    const password = 'computer22';

    const credentials = {
      firstName,
      lastName,
      walletName: values.accountId,
      password
    };
    if (router.query.phone) {
      credentials.phone = `${router.query.phone}`;
      credentials.countryCode = "+1";
    }
    if (router.query.email) {
      credentials.email = `${router.query.email}`;
    }

    try {
      await AuthService.signupUser({
        ...credentials,
        walletName: `${credentials.walletName}.${walletSuffix}`,
      });
    } catch (e) {
      notifyError(getError(e, "Error while creating account"));
      helpers.setSubmitting(false);
      return;
    }

    // Prompt user to choose between customer/merchant view on root "dashboard"
    router.push({ pathname: "/dashboard" });
  };

  return (
    <AuthLayout title="Account Details">
      <Formik initialValues={initialValues} validationSchema={validation} onSubmit={onSubmit}>
        {({ isValid, dirty, isSubmitting, submitForm }) => (
          <AuthLayout.Content>
            <Form>
              <Typography sx={{ mb: 4, textAlign: "center" }} variant="body1">
                Enter an Account ID to use with your PrimeLab account. Your Account ID will be used for all PrimeLab
                operations, including sending and receiving assets.
              </Typography>
              <Field autoFocus component={TextField} label="Full Name" name="fullName" sx={{ mb: 1 }} />
              <Field
                component={TextField}
                label="Account ID"
                name="accountId"
                InputProps={{ endAdornment: <TextFieldNearSuffix /> }}
              />
              <LoadingButton
                disabled={!(dirty && isValid)}
                loading={isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                onClick={submitForm}
              >
                Create Account
              </LoadingButton>
            </Form>
            <AuthLayoutPromptLogin />
          </AuthLayout.Content>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default CreateCustomer;
