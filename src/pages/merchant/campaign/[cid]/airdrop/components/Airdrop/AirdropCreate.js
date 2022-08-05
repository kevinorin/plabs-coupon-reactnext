import { AddCircleOutline as AddIcon, RemoveCircleOutline as RemoveIcon } from "@mui/icons-material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Badge, Box, IconButton, Stack, Tab, Typography } from "@mui/material";
import { Field, FieldArray, FieldArrayRenderProps, Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import { Dispatch, SetStateAction, useState } from "react";
import * as Yup from "yup";

// Utilities
import { useSnackbar } from "@hooks";

// Types
import { IAirdropCreateForm } from "../../index.page";

// NOTE: Email/phone validation should not "require" either to be entered (complicates schema);
//         however, the preview page will simply display an empty state!
const validation = Yup.object().shape({
  emails: Yup.array().of(Yup.string().label("Email").email()),
  phones: Yup.array().of(
    Yup.string()
      .label("Phone")
      .test("digits", "${label} must be 10 digits", (v) => !v || /^\d{10}$/.test(v ?? ""))
  ),
});

const AirdropCreateForm = (props) => {
  const { nextStep, formData, setFormData } = props;
  const { notifyWarning } = useSnackbar();
  const [currentTab, setCurrentTab] = useState("1");

  /** Handle changing tabs */
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  /** Submit handler */
  const onSubmit = async (values, helpers) => {
    helpers.setSubmitting(false);

    // Filter out empty email/phone values
    const validData = {
      emails: values.emails.filter((x) => x),
      phones: values.phones.filter((x) => x),
    };

    // Prevent airdropping campaign if no valid recipients have been selected
    if (!validData.emails.length && !validData.phones.length) {
      notifyWarning("No recipients selected");
      return;
    }

    setFormData(validData);
    nextStep();
  };

  /*** Field array action button */
  const FieldActionBtn = ({
    actions,
    index,
    last,
  }) => (
    <div>
      {last ? (
        <IconButton sx={{ mb: 2 }} color="primary" onClick={() => actions.push("")}>
          <AddIcon />
        </IconButton>
      ) : (
        <IconButton sx={{ mb: 2 }} onClick={() => actions.remove(index)}>
          <RemoveIcon />
        </IconButton>
      )}
    </div>
  );

  /**
   * Render tab label badge (with error indicator)
   *
   * @param label - Tab label
   * @param error - Whether tab contains errors
   */
  const renderLabelBadge = (label, error) => (
    <Badge color="error" invisible={!error} variant="dot">
      {label}
    </Badge>
  );

  return (
    <Formik initialValues={formData} validationSchema={validation} onSubmit={onSubmit}>
      {({ errors, isSubmitting, submitForm, values }) => (
        <Form>
          <TabContext value={currentTab}>
            <Typography sx={{ mb: 2 }} textAlign="center" variant="h4">
              Airdrop Coupon Campaign
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList centered variant="fullWidth" onChange={handleTabChange}>
                <Tab
                  label={renderLabelBadge("Email", Boolean(currentTab === "2" && errors?.emails?.length))}
                  value="1"
                />
                <Tab
                  label={renderLabelBadge("Phone", Boolean(currentTab === "1" && errors?.phones?.length))}
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel sx={{ px: 0 }} value="1">
              <FieldArray
                name="emails"
                render={(arrayHelpers) =>
                  values.emails.map((email, index, array) => (
                    <Stack key={`email-${index}`} direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                      <Field
                        autoFocus
                        component={TextField}
                        label="Email Address"
                        name={`emails.${index}`}
                        size="small"
                      />
                      <FieldActionBtn actions={arrayHelpers} index={index} last={index === array.length - 1} />
                    </Stack>
                  ))
                }
              />
            </TabPanel>
            <TabPanel sx={{ px: 0 }} value="2">
              <FieldArray
                name="phones"
                render={(arrayHelpers) =>
                  values.phones.map((phone, index, array) => (
                    <Stack key={`phone-${index}`} direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                      <Field
                        component={TextField}
                        defaultValue="+1"
                        disabled
                        label=""
                        name={`countryCode.${index}`}
                        size="small"
                        sx={{
                          flexShrink: 0,
                          width: "6ch",
                          pr: 1,
                        }}
                      />
                      <Field
                        component={TextField}
                        label="Phone Number"
                        name={`phones.${index}`}
                        size="small"
                        sx={{ flexGrow: 1 }}
                      />
                      <FieldActionBtn actions={arrayHelpers} index={index} last={index === array.length - 1} />
                    </Stack>
                  ))
                }
              />
            </TabPanel>
          </TabContext>
          <LoadingButton fullWidth loading={isSubmitting} onClick={submitForm}>
            Preview
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};

export default AirdropCreateForm;
