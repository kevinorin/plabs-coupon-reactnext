import styled from "@emotion/styled";
import { Box } from "@mui/system";

/** Status chip */
export const StatusChip = styled(Box)<{
}>`
  ${(p) =>
    p.absolute &&
    `
    position: absolute;
    top: 16px;
    left: 16px;
  `}
  width: fit-content;
  padding: 2px 6px;
  border-radius: 4px;
  color: ${(p) => p.textColor ?? "black"};
  background-color: ${(p) => p.backgroundColor ?? "transparent"};
`;
