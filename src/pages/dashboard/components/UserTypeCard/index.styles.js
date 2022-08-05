import styled from "@emotion/styled";
import { Card as MuiCard, lighten, Typography } from "@mui/material";

// Utilities
import { palette } from "@theme";

export const Card = styled(MuiCard)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px;
  cursor: pointer;
  border: 4px solid transparent;
  ${(p) =>
    p.selected &&
    `background-color: ${lighten(palette.primary.main, 0.85)};
    border-color: ${palette.primary.main};`}
  &:hover {
    border-color: ${palette.primary.main};
  }
`;

export const CardTitle = styled(Typography)`
  position: absolute;
  bottom: 16px;
  margin-top: 24px;
  font-size: 1.1rem;
  font-weight: bold;
`;
