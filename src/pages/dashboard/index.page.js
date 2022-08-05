import { ContactsOutlined as CustomerIcon, SellOutlined as MerchantIcon, SvgIconComponent } from "@mui/icons-material";
import { useRouter } from "next/router";

// Components
import { AuthLayout } from "@pages/auth/components";
import { UserTypeCard } from "./components";

// Utilities
import { useAppDispatch, useAppSelector, useAuthGuard, useMobileBreakpoint } from "@hooks";
import { selectMerchantProfile, toggleMerchantView } from "@store/slices/merchant.slice";
import { getDashboardLink } from "@utils/links.util";

import { Stack } from "@mui/material";

const profileTypes = [
  { code: "merchant", icon: MerchantIcon, title: "Merchant" },
  { code: "customer", icon: CustomerIcon, title: "Customer" },
];

const Dashboard = () => {
  useAuthGuard({ requiresAuth: true });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const existingMerchant = useAppSelector(selectMerchantProfile);

  /**
   * Navigate to selected profile dashboard
   *
   * @param type - Selected profile type
   */
  const selectUserType = (type) => {
    const dashboardLink = getDashboardLink(type);

    if (type === "customer") {
      dispatch(toggleMerchantView(false));
      router.push({ pathname: dashboardLink });
    } else {
      if (existingMerchant) {
        dispatch(toggleMerchantView(true));
        router.push({ pathname: dashboardLink });
      } else {
        router.push({ pathname: "/merchant/create" });
      }
    }
  };

  const stackDirection = useMobileBreakpoint() ? "column" : "row";

  return (
    <AuthLayout tabTitle="Select Profile" title="Continue as">
      <Stack direction={stackDirection} spacing={4}>
        {profileTypes.map((type) => (
          <UserTypeCard
            key={type.code}
            Icon={type.icon}
            title={type.title}
            onSelect={() => selectUserType(type.code)}
          />
        ))}
      </Stack>
    </AuthLayout>
  );
};

export default Dashboard;
