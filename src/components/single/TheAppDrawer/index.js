import { Add as AddIcon } from "@mui/icons-material";
import { Divider, Stack } from "@mui/material";
import { useRouter } from "next/router";

// Components
import { LinkButton } from "@components/typography";
import DrawerLink from "./DrawerLink";


const merchantLinks = [
  {
    text: "Coupon Campaigns",
    to: "/merchant/dashboard",
  },
  {
    disabled: true,
    text: "Settings",
    to: "/merchant/settings",
  },
];

const userLinks = [
  {
    text: "Coupons",
    to: "/customer/dashboard",
  },
  {
    disabled: true,
    text: "Settings",
    to: "/customer/settings",
  },
];

const TheAppDrawer = (props) => {
  const { view } = props;

  const router = useRouter();

  const merchantView = view === "merchant";
  const links = merchantView ? merchantLinks : userLinks;

  return (
    <Stack sx={{ p: 4, pr: { md: 0 } }}>
      {merchantView && (
        <>
          <LinkButton fullWidth startIcon={<AddIcon />} to="/merchant/campaign/create">
            Create Campaign
          </LinkButton>
          <Divider sx={{ my: 3 }} />
        </>
      )}
      <Stack spacing={2}>
        {links.map((link) => (
          <DrawerLink
            key={link.to}
            disabled={link.disabled}
            selected={link.to === router.pathname}
            text={link.text}
            to={link.to}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default TheAppDrawer;
