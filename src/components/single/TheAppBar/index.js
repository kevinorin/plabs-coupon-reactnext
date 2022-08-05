import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import {
  ArrowDropDown as DropdownIcon,
  AccountCircleOutlined as ProfileIcon,
  AccountBalance as MerchantIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

// Components
// import { Link } from "@components/typography";
import { Link } from "../../typography";
import ProfileMenu from "./ProfileMenu";

// Utilities
import { useAppDispatch, useAppSelector } from "../../../hooks";
import couponLogo from "/public/nft_coupon.png";
import { selectProfile } from "../../../store/slices/user.slice";
import { selectMerchantProfile, selectViewedMerchant, toggleMerchantView } from "../../../store/slices/merchant.slice";
// import { getDashboardLink } from "@utils/links.util";

// Styles
import * as SC from "./index.styles";

const TheAppBar = (props) => {
  const { drawerOpen, mobileBreakPoint } = props;
  const router = useRouter();
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(null);

  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const merchantProfile = useAppSelector(selectMerchantProfile);
  const viewedMerchant = useAppSelector(selectViewedMerchant);

  const profileMenuName = viewedMerchant?.name ?? profile?.walletId.slice(0, profile.walletId.lastIndexOf("."));

  /** Open the profile menu */
  const openProfileMenu = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  /** Close the profile menu */
  const closeProfileMenu = () => {
    setProfileAnchorEl(null);
  };

  /**
   * Toggle between viewing as a merchant or customer
   *
   * @param viewAsMerchant - Whether to enable viewing as a merchant
   */
  const toggleMerchant = (viewAsMerchant) => {
    if (viewAsMerchant && viewedMerchant) return;

    dispatch(toggleMerchantView(viewAsMerchant));

    // Redirect to user dashboard if removing the selected merchant, or the merchant
    //   dashboard when a merchant is selected.
    router.push({
      pathname: "/merchant",
    });

    closeProfileMenu();
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "common.white" }}>
      <Toolbar>
        <SC.AppBarLogo>
          <Link
            href={"/merchant"}
            sx={{ display: "flex", zIndex: 10 }}
          >
            <Image alt="Coupon Logo" height="48" width="97" objectFit="contain" src={couponLogo} />
          </Link>
        </SC.AppBarLogo>
        {profile && (
          <>
            <Button
              endIcon={<DropdownIcon />}
              startIcon={viewedMerchant ? <MerchantIcon /> : <ProfileIcon />}
              sx={{ textTransform: "none" }}
              variant="outlined"
              onClick={openProfileMenu}
            >
              {profileMenuName}
            </Button>
            <ProfileMenu
              anchorEl={profileAnchorEl}
              merchantProfile={merchantProfile}
              profile={profile}
              viewingAsMerchant={Boolean(viewedMerchant)}
              onClose={closeProfileMenu}
              onToggleMerchant={toggleMerchant}
            />
          </>
        )}
        {mobileBreakPoint && (
          <IconButton onClick={drawerOpen} sx={{ ml: 1 }} color="primary" aria-label="open drawer" edge="start">
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TheAppBar;
