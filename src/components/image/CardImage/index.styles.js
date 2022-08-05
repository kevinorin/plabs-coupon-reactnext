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
