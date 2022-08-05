import { Box, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

/** Prompt for empty sections (with optional action/content) */
const EmptyPrompt = (props) => {
  const { children, spacing = 4, text } = props;

  return (
    <Stack alignItems="center" sx={{ padding: spacing }}>
      <Typography color="gray" variant="body1">
        {text}
      </Typography>
      {children && <Box sx={{ mt: 3 }}>{children}</Box>}
    </Stack>
  );
};

export default EmptyPrompt;
