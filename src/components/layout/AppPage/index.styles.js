import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

// import * as CSS from "csstype";

// Utilities
import appTheme from "../../../styles/theme";

/** Page wrapper */
export const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

/** Page main content */
export const PageContentMain = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 0px;
  height: 100%;
`;

/** Page content card title */
export const PageCardTitle = styled(Typography)`
  position: relative;
  padding: 12px;
  text-align: center;
`;

/** Page content card children */
export const PageCardContent = styled(Box)``;

/** Drawer Header Section */
export const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  padding: appTheme.spacing(0, 1),
  ...(appTheme.mixins.toolbar),
  justifyContent: "flex-start",
}));
