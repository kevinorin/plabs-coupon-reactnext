import { Stack, Box, Typography } from "@mui/material";
import { CheckCircleOutlineOutlined as CheckCircle } from "@mui/icons-material";
import { ReactNode } from "react";

const AppPageSuccess = (props) => {
  const { children, message } = props;
  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ minHeight: 290 }}>
      <CheckCircle sx={{ fontSize: 90, color: "secondary.main" }} />
      <Typography sx={{ color: "secondary.main" }}>{message}</Typography>
      <Box>{children}</Box>
    </Stack>
  );
};

export default AppPageSuccess;
