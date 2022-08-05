import styled from "@emotion/styled";
import { Box } from "@mui/material";

/** Stats chart tooltip legend item */
export const ChartTooltipItem = styled(Box)`
  height: 12px;
  width: 12px;
  margin-right: 6px;
  border-radius: 6px;
  border: 1px solid white;
  background-color: ${(p) => p.color};
`;
