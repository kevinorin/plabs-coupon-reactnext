import { SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

// Styles
import * as SC from "./index.styles";

/** Layout items in a grid (with spacing) */
const GridLayout = (props) => {
  const { children, spacing = 16, sx } = props;

  return (
    <SC.GridLayoutContainer sx={sx}>
      <SC.GridLayoutInner spacing={spacing}>{children}</SC.GridLayoutInner>
    </SC.GridLayoutContainer>
  );
};

export default GridLayout;
