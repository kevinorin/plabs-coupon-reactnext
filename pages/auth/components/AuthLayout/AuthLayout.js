import { Stack } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

// Components
import { AppPage } from "../../../../src/components/layout";

// Utilities
import couponLogo from "/public/nft_coupon.png";

// Styles
import * as SC from "./AuthLayout.styles";

const AuthLayout = (props) => {
  const { children, hideLogo = false, tabTitle, title } = props;

  return (
    <AppPage hideAppBar tabTitle={tabTitle ?? title ?? "PrimeLab Coupons"}>
      <AppPage.Body centerLayout>
        <Stack justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
          {!hideLogo && (
            <SC.AuthLayoutLogo>
              <Image alt="Coupon Logo" height="48" objectFit="contain" src={couponLogo} width="97" />
            </SC.AuthLayoutLogo>
          )}
          {Boolean(title) && <SC.AuthLayoutTitle variant="h1">{title}</SC.AuthLayoutTitle>}
          <SC.AuthLayoutContent>{children}</SC.AuthLayoutContent>
        </Stack>
      </AppPage.Body>
    </AppPage>
  );
};

/** Auth layout child content wrapper */
AuthLayout.Content = SC.AuthLayoutContentInner;

export default AuthLayout;
