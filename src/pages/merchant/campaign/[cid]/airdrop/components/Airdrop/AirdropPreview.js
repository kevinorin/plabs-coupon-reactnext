import {
  Button,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

// Components
import { EmptyPrompt } from "@components/typography";

// Utilities
import { sleep } from "@utils/sleep.util";

const AirdropPreview = (props) => {
  const { nextStep, prevStep, formData } = props;

  const recipients = [
    ...formData.emails.map((e) => ({ email: e, phone: null })),
    ...formData.phones.map((p) => ({ email: null, phone: p })),
  ];

  /** Handle airdropping the coupon campaign invitation links */
  const onAirdrop = async () => {
    await sleep(1000);

    nextStep();
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Typography variant="h3">Campaign List</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Recipient Email</TableCell>
              <TableCell align="right">Recipient Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipients.map((recipient, idx) => (
              <TableRow key={idx}>
                <TableCell>{recipient.email ?? "N/A"}</TableCell>
                <TableCell align="right">{recipient.phone ?? "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!recipients.length && <EmptyPrompt spacing={2} text="No recipients selected" />}
      <Button disabled={!recipients.length} sx={{ mt: "32px !important" }} onClick={onAirdrop}>
        Airdrop Campaign
      </Button>
      <Button color={"secondary"} onClick={prevStep} variant="text">
        Back
      </Button>
    </Stack>
  );
};

export default AirdropPreview;
