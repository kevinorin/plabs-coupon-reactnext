import { SxProps, Theme } from "@mui/material/styles";
import Head from "next/head";
import { ReactNode, useState } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import { Divider, Drawer, Grid, IconButton } from "@mui/material";

// Components
import { TheAppBar } from "@components/single";
import AppPageBody from "./AppPageBody";
import AppPageCard from "./AppPageCard";
import AppPageSuccess from "./AppPageSuccess";
import { TheAppDrawer } from "@components/single";

// Utilities
import { useAppSelector, useMobileBreakpoint } from "@hooks";
import { selectViewedMerchant } from "@store/slices/merchant.slice";

// Styles
import * as SC from "./index.styles";

const AppPage = (props) => {
  const { children, hideAppBar = false, left, mainSx, tabTitle } = props;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const viewedMerchant = useAppSelector(selectViewedMerchant);
  const drawerView = viewedMerchant ? "merchant" : "customer";
  const mobileBreakpoint = useMobileBreakpoint();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const drawerWidth = 280;

  return (
    <SC.Page>
      <Head>
        <title>Coupons | {tabTitle}</title>
      </Head>
      {!hideAppBar && <TheAppBar drawerOpen={handleDrawerOpen} mobileBreakPoint={mobileBreakpoint} />}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <SC.DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </SC.DrawerHeader>
        <Divider />
        <TheAppDrawer view={drawerView} />
      </Drawer>
      <Grid container justifyContent="center" sx={{ flexGrow: 1 }}>
        {!mobileBreakpoint && left && (
          <Grid item xs={12} md={2}>
            {left}
          </Grid>
        )}
        <Grid item xs={12} md={10}>
          {/* @ts-ignore */}
          <SC.PageContentMain sx={mainSx}>{children}</SC.PageContentMain>
        </Grid>
      </Grid>
    </SC.Page>
  );
};

AppPage.Body = AppPageBody;
AppPage.Card = AppPageCard;
AppPage.Success = AppPageSuccess;

export default AppPage;
