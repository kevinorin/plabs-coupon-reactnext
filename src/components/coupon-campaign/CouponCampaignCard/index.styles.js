import styled from "@emotion/styled";
import { CardMedia } from "@mui/material";

/** Card image */
export const CardImage = styled(CardMedia)`
  display: flex;
  position: relative;

  /* NOTE: Child 'Image' component must be forced to expand to match width! */
  > span {
    width: 100% !important;
  }
`;

/** Card footer text container */
export const CardFooter = styled.div`
  display: flex;
  align-items: center;
`;

/** Card footer merchant logo */
export const CardFooterLogo = styled.div<{ size?: number }>`
  height: ${(p) => p.size ?? 40}px;
  width: ${(p) => p.size ?? 40}px;
  margin-right: 12px;
  background-color: lightgrey;
  border: 2px solid darkgrey;
  border-radius: 4px;
`;
