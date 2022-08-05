import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

// Components
import { CouponCard, CouponClaimDialog } from "@components/coupon";
import { AppPage } from "@components/layout";
import { ISearchItem, ISearchItemFilters, ItemSearch } from "@components/search";
import { TheAppDrawer } from "@components/single";
import { EmptyPrompt, SectionHeader } from "@components/typography";

// Utilities
import { useAppDispatch, useAppSelector, useAuthGuard, useSnackbar } from "@hooks";
import { claimCoupon, selectCouponsByStatus } from "@store/slices/coupons.slice";
import { parseSearchParams } from "@utils/search.util";

const Dashboard = () => {
  useAuthGuard({ requiresAuth: true });

  const [couponToClaim, setCouponToClaim] = useState(null);

  const router = useRouter();
  const couponFilters = parseSearchParams<ISearchItemFilters>(router.query, { merchants: [], search: "" });

  const dispatch = useAppDispatch();
  const { notify } = useSnackbar();
  const activeCoupons = useAppSelector((state) => selectCouponsByStatus(state, ["active", "unclaimed"]));
  const pastCoupons = useAppSelector((state) => selectCouponsByStatus(state, "expired"));

  // TODO: Refactor once an API exists to get all available merchants for a user's coupons
  const filterableMerchants = [...activeCoupons, ...pastCoupons].reduce((accum, coupon) => {
    const merchant = accum.find((m) => m.id === coupon.merchant.id);
    if (merchant) return accum;

    return [...accum, { id: coupon.merchant.id, name: coupon.merchant.name }];
  }, []);

  /**
   * Apply coupon filters to individual lists of coupons
   *
   * TODO: This implementation is client-side only and must be replaced with sever-side filtering!
   *
   * @param   coupons - Unfiltered lists
   * @returns Filtered coupon list
   */
  const applyFilters = (coupons) => {
    return coupons.filter((c) => {
      const nameMatches = couponFilters.search
        ? c.name.toLowerCase().includes(couponFilters.search.toLowerCase())
        : true;
      const merchantMatches = couponFilters.merchants?.length ? couponFilters.merchants.includes(c.merchant.id) : true;
      return nameMatches && merchantMatches;
    });
  };

  const filteredActiveCoupons = applyFilters(activeCoupons);
  const filteredPastCoupons = applyFilters(pastCoupons);

  /** Card claiming handler */
  const onCardClaim = () => {
    if (!couponToClaim || couponToClaim.status !== "unclaimed") return;

    setCouponToClaim(null);
    dispatch(claimCoupon(couponToClaim.id));

    notify("Coupon claimed");
  };

  /** Card selection handler */
  const onCardSelect = (coupon) => {
    router.push({
      pathname: `/customer/coupon/${coupon.id}`,
    });
  };

  return (
    <AppPage left={<TheAppDrawer view="customer" />} tabTitle="Dashboard">
      <CouponClaimDialog
        coupon={couponToClaim}
        open={Boolean(couponToClaim)}
        onCancel={() => setCouponToClaim(null)}
        onClaim={onCardClaim}
      />
      <AppPage.Body>
        <ItemSearch items={filterableMerchants} multiple selectKey="merchants" selectLabel="Brands" />
        <SectionHeader>Active Coupons</SectionHeader>
        {!activeCoupons.length && <EmptyPrompt text="You don't have any coupons yet" />}
        {Boolean(activeCoupons.length && !filteredActiveCoupons.length) && (
          <EmptyPrompt text="No coupons match these filters" />
        )}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {filteredActiveCoupons.map((coupon) => (
            <Grid key={coupon.id} item xs={12} sm={6} md={4} lg={3}>
              <CouponCard
                coupon={coupon}
                onClaim={() => setCouponToClaim(coupon)}
                onSelect={() => onCardSelect(coupon)}
              />
            </Grid>
          ))}
        </Grid>
        <SectionHeader>Past Coupons</SectionHeader>
        {!pastCoupons.length && <EmptyPrompt text="You don't have any past coupons" />}
        {Boolean(pastCoupons.length && !filteredPastCoupons.length) && (
          <EmptyPrompt text="No coupons match these filters" />
        )}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {filteredPastCoupons.map((coupon) => (
            <Grid key={coupon.id} item xs={12} sm={6} md={4} lg={3}>
              <CouponCard coupon={coupon} onSelect={() => onCardSelect(coupon)} />
            </Grid>
          ))}
        </Grid>
      </AppPage.Body>
    </AppPage>
  );
};

export default Dashboard;
