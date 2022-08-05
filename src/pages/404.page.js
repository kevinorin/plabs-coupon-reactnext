import { WarningRounded as AlertIcon } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

// Components
import { AppPage } from "@components/layout";
import { LinkButton } from "@components/typography";

// Utilities
import { useAppSelector } from "@hooks";
import { selectViewingAsMerchant } from "@store/slices/merchant.slice";
import { selectProfile } from "@store/slices/user.slice";
import { getDashboardLink } from "@utils/links.util";

const PageNotFound = () => {
  const profile = useAppSelector(selectProfile);
  const viewingMerchant = useAppSelector(selectViewingAsMerchant);

  const dashboardLink = getDashboardLink(viewingMerchant ? "merchant" : "customer");

  return (
    <AppPage tabTitle="Page Not Found">
      <AppPage.Card contentSx={{ p: 8, pt: 6 }} title="Page Not Found">
        <Stack alignItems="center">
          <Typography sx={{ display: "flex", alignItems: "center" }} variant="h3">
            <AlertIcon color="warning" sx={{ mr: 2, fontSize: 48 }} />
            Oops!
          </Typography>
          <Typography sx={{ mt: 4 }}>Looks like this page doesn&lsquo;t exist!</Typography>
          {profile && (
            <LinkButton to={dashboardLink} size="large" sx={{ mt: 4 }} variant="outlined">
              Dashboard
            </LinkButton>
          )}
        </Stack>
      </AppPage.Card>
    </AppPage>
  );
};

export default PageNotFound;
