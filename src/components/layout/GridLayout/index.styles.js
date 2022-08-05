import styled from "@emotion/styled";
import { Box } from "@mui/material";

const defaultSpacing = 16;

export const GridLayoutContainer = styled(Box)`
  width: 100%;
`;

/** Inner container for grid layout applies the spacing offset (to allow parent to set margin) */
export const GridLayoutInner = styled.div`
  display: flex;
  width: 100%;
  margin: -${(p) => p.spacing ?? defaultSpacing}px;

  > * {
    margin: ${(p) => p.spacing ?? defaultSpacing}px;
  }
`;
