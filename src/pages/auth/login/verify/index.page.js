import { LoadingButton } from "@mui/lab";
import { Alert, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as Yup from "yup";

// Components
import { AuthLayout, AuthLayoutPrompt } from "@pages/auth/components";
import OTPInput from "@components/form/OTPInput";

// Utilities
import { useAuthGuard, useErrors, useSnackbar } from "@hooks";
import { AuthService } from "@services";
import { palette } from "@theme";

// Styles
import * as SC from "./index.styles";

interface IOtpForm {
  otp: string;
}

const validation = Yup.object({
  otp: Yup.string()
    .label("Verification code")
    .matches(/^\d{6}$/, "${label} must be 6 digits")
    .required(),
});

const initialValues: IOtpForm = {
  otp: "",
};

/** OTP verification */
const Verify: NextPage = () => {
  useAuthGuard({ requiresNoAuth: true });

  const router = useRouter();
  const { notifyError } = useSnackbar();
  const { getError } = useErrors();

  let { recipient, walletId } = router.query;
  walletId = Array.isArray(walletId) ? walletId[0] : walletId;
  recipient = Array.isArray(recipient) ? recipient[0] : recipient;
  const validRequest = Boolean(walletId) && Boolean(recipient);
  const channelType = recipient?.includes("@") ? "email address" : "phone number";

  /** Resend OTP code (by duplicating login flow) */
  const onResendCode = async (formikBag: FormikProps<IOtpForm>) => {
    formikBag.resetForm();
    formikBag.setSubmitting(true);

    try {
      await AuthService.login({ walletId: walletId as string });
    } catch (e: any) {
      formikBag.setSubmitting(false);
      notifyError(getError(e, "Error resending verification code"));
      return;
    }

    formikBag.setSubmitting(false);
  };

  /** Submit handler */
  const onSubmit = async (values: IOtpForm, helpers: FormikHelpers<IOtpForm>) => {
    if (!walletId) {
      notifyError("Account ID is missing");
      return;
    }

    try {
      await AuthService.loginVerify({ walletId: walletId as string, otp: values.otp });

      const { redirectUrl } = router.query;
      if (redirectUrl && !Array.isArray(redirectUrl)) {
        // NOTE: Force a page refresh to better clean up app state
        window.location.replace(redirectUrl);
      } else {
        // Prompt user to choose between customer/merchant view on root "dashboard"
        // NOTE: Force a page refresh to better clean up app state
        window.location.replace("/dashboard");
      }
    } catch (e: any) {
      notifyError(getError(e, "Error while verifying OTP"));
      helpers.setSubmitting(false);
      return;
    }
  };

  return (
    <AuthLayout title="Verification">
      <Formik initialValues={initialValues} validationSchema={validation} onSubmit={onSubmit}>
        {(formikBag) => (
          <AuthLayout.Content>
            {validRequest ? (
              <>
                <SC.VerificationPrompt>
                  We&lsquo;ve sent a 6 digit verification
                  <br />
                  code to the {channelType}:
                </SC.VerificationPrompt>
                <SC.VerificationPromptRecipient>{recipient}</SC.VerificationPromptRecipient>
              </>
            ) : (
              <Alert severity="error" sx={{ mb: 4 }} variant="filled">
                Invalid verification data
              </Alert>
            )}
            <Typography color={palette.text.secondary} textAlign="center" sx={{ mb: 2 }}>
              Enter verification code
            </Typography>
            <Form>
              <Field autoFocus component={OTPInput} name="otp" onEnter={formikBag.submitForm} />
              <LoadingButton
                disabled={!validRequest}
                loading={formikBag.isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                onClick={formikBag.submitForm}
              >
                Continue
              </LoadingButton>
            </Form>
            <AuthLayoutPrompt
              actionText="Resend your code"
              disabled={formikBag.isSubmitting}
              promptText="Didn't receive your code?"
              onAction={() => onResendCode(formikBag)}
            />
          </AuthLayout.Content>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Verify;
