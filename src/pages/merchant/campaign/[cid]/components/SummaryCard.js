import { Divider, Paper, Stack, Typography } from "@mui/material";

const SummaryCard = () => {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 4 }}>
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent="space-evenly"
      >
        <Stack alignItems="center">
          <Typography variant="h3">120 NEAR</Typography>
          <Typography variant="body1">Total Revenue</Typography>
        </Stack>
        <Stack alignItems="center">
          <Typography variant="h3">54</Typography>
          <Typography variant="body1">Total Sent</Typography>
        </Stack>
        <Stack alignItems="center">
          <Typography variant="h3">37</Typography>
          <Typography variant="body1">Total Claimed</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SummaryCard;
