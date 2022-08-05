import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  DeleteOutlined as DeleteIcon,
  Pending as MoreIcon,
  ShareOutlined as ShareIcon,
  SvgIconComponent,
  Timeline as StatsIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";

// Components
import { CouponCampaignCard } from "@components/coupon-campaign";

// Types
// import { ICampaign } from "@typings/coupon.types";


const CampaignCard = (props) => {
  const router = useRouter();
  const { campaign, onEndCampaign, onSelect } = props;
  const campaignId = campaign.id;

  // Open/Close Menu Feature
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  /** Open the card menu
   * @param e - Mouse Event
   */
  const handleMenuOpen = (e) => {
    // event.stopPropagation is used to prevent the parent event to go to view page
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  /** Close the card menu
   * @param e - Mouse Event
   */
  const handleMenuClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const menuOptions = [
    {
      icon: StatsIcon,
      label: "Stats",
      onClick: (e) => {
        e.stopPropagation();
        router.push({
          pathname: `/merchant/campaign/${campaignId}`,
        });
      },
    },
  ];
  // Ended campaigns have limited options
  if (campaign.status !== "ended") {
    menuOptions.push(
      {
        icon: ShareIcon,
        label: "Airdrop",
        onClick: (e) => {
          e.stopPropagation();
          router.push({
            pathname: `/merchant/campaign/${campaignId}/airdrop`,
          });
        },
      },
      {
        icon: DeleteIcon,
        label: "End Campaign",
        onClick: (e) => {
          e.stopPropagation();
          setAnchorEl(null);
          onEndCampaign?.();
        },
      }
    );
  }

  /** Render card actions */
  const renderActions = () => (
    <>
      <IconButton color="primary" onClick={handleMenuOpen}>
        <MoreIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={menuOpen} PaperProps={{ style: { width: 180 } }} onClose={handleMenuClose}>
        {menuOptions.map((option) => (
          <MenuItem key={option.label} onClick={option.onClick} dense>
            <ListItemIcon>
              <option.icon />
            </ListItemIcon>
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  return <CouponCampaignCard actions={renderActions()} item={campaign} onSelect={onSelect} />;
};

export default CampaignCard;
