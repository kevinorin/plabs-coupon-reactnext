import styled from "@emotion/styled";
import { Typography } from "@mui/material";

// Utilities
import { palette } from "@theme";

/** Verification code prompt message */
export const VerificationPrompt = styled(Typography)`
  text-align: center;
`;

/** Verification code recipient (email/phone) */
export const VerificationPromptRecipient = styled(Typography)`
  margin-top: 8px;
  margin-bottom: 32px;
  text-align: center;
  color: ${palette.primary.main};
`;
