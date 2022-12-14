import { Add as AddIcon } from "@mui/icons-material";
import { Divider, ListItem, Menu, MenuItem, Typography } from "@mui/material";

// Components
// import { Link } from "@components/typography";
import { Link } from "../../typography";

// Utilities
// import { getDashboardLink } from "@utils/links.util";

// Types
// import { IMerchant } from "@typings/merchant.types";
// import { IUser } from "@typings/user.types";

// type Props = {
//   /** HTML anchor element (for attachment) */
//   anchorEl: HTMLElement | null;
//   /** User account profile */
//   profile: IUser;
//   /** User merchant profile (if any) */
//   merchantProfile: IMerchant | null;
//   /** Whether user is viewing as merchant (or customer) */
//   viewingAsMerchant: boolean;
//   /** Close handler */
//   onClose: () => void;
//   /** Toggle merchant profile view */
//   onToggleMerchant: (viewAsMerchant: boolean) => void;
// };

const ProfileMenu = (props) => {
  const { anchorEl, merchantProfile, profile, viewingAsMerchant, onClose, onToggleMerchant } = props;

  // const dashboardLink = getDashboardLink(viewingAsMerchant ? "merchant" : "customer");
  const dashboardLink = "/merchant"

  return (
    <Menu
      id="menu-appbar-profile"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      open={Boolean(anchorEl)}
      PaperProps={{
        style: {
          marginTop: 8,
          minWidth: 200,
        },
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      onClose={onClose}
    >
      <ListItem>
        <Typography color="primary.dark">{profile.fullName}</Typography>
      </ListItem>
      <MenuItem component={Link} href={dashboardLink}>
        Dashboard
        <small>&ensp;({viewingAsMerchant ? "Merchant" : "Customer"})</small>
      </MenuItem>

      {viewingAsMerchant && <MenuItem onClick={() => onToggleMerchant(false)}>View as Customer</MenuItem>}
      {!viewingAsMerchant && merchantProfile && (
        <MenuItem onClick={() => onToggleMerchant(true)}>View as Merchant</MenuItem>
      )}
      {!viewingAsMerchant && !merchantProfile && (
        <MenuItem component={Link} href="/merchant/create">
          <AddIcon color="primary" sx={{ mr: 1 }} />
          Setup Merchant
        </MenuItem>
      )}

      <Divider sx={{ mb: 1 }} />
      <MenuItem component={Link} href="/profile">
        Profile
      </MenuItem>
      <MenuItem component={Link} href="/auth/logout">
        Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
