import { AccountCircleOutlined as AccountIcon } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { NextPage } from "next";

// Components
import { AppPage } from "@components/layout";

// Utilities
import { useAppSelector, useAuthGuard } from "@hooks";
import { selectProfile } from "@store/slices/user.slice";

const Profile: NextPage = () => {
  useAuthGuard({ requiresAuth: true });

  const profile = useAppSelector(selectProfile);

  return (
    <AppPage tabTitle="Profile">
      <AppPage.Card variant="constrained" contentSx={{ p: 4 }} title="Profile">
        <Typography variant="subtitle2">Connected Wallet</Typography>
        <Typography sx={{ display: "flex", alignItems: "center" }} variant="body1">
          <AccountIcon color="primary" sx={{ mr: 1 }} />
          {profile?.walletId}
        </Typography>

        <Typography sx={{ mt: 2 }} variant="subtitle2">
          Name
        </Typography>
        <Typography>{profile?.fullName}</Typography>
        <Typography sx={{ mt: 1 }} variant="subtitle2">
          Email
        </Typography>
        <Typography>{profile?.email ?? "N/A"}</Typography>
        <Typography sx={{ mt: 1 }} variant="subtitle2">
          Phone
        </Typography>
        <Typography>{profile?.phone ?? "N/A"}</Typography>
      </AppPage.Card>
    </AppPage>
  );
};

export default Profile;
