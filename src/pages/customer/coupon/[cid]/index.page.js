import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Components
import { CouponClaimDialog, CouponPreview } from "@components/coupon";
import { AppPage } from "@components/layout";

// Utilities
import { useAppDispatch, useAppSelector, useAuthGuard, useSnackbar } from "@hooks";
import { claimCoupon, selectCoupon } from "@store/slices/coupons.slice";
import { getDashboardLink } from "@utils/links.util";

const CouponDetails: NextPage = () => {
  useAuthGuard({ requiresAuth: true });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notify } = useSnackbar();

  const couponId = router.query.cid;
  // NOTE: Invalid IDs are handled automatically by detecting invalid/missing coupon!
  const coupon = useAppSelector((state) => selectCoupon(state, couponId as string));

  const unclaimed = coupon?.status === "unclaimed";
  const [showCouponClaimDialog, setShowCouponClaimDialog] = useState(false);

  // Ensure valid coupon is present
  useEffect(() => {
    if (!coupon) {
      router.back();
    }
  }, [coupon, router]);

  // TODO: Handle unclaimed coupon (from URL)!

  /** Claim coupon confirmation callback */
  const onClaimCoupon = () => {
    if (!coupon) return;

    setShowCouponClaimDialog(false);
    dispatch(claimCoupon(coupon.id));

    router.push({
      pathname: getDashboardLink("customer"),
    });

    notify("Coupon claimed");
  };

  return (
    <AppPage tabTitle="Coupon Preview">
      <CouponClaimDialog
        coupon={coupon ?? null}
        open={showCouponClaimDialog}
        onCancel={() => setShowCouponClaimDialog(false)}
        onClaim={onClaimCoupon}
      />
      <AppPage.Card
        variant="constrained"
        contentSx={{ p: 4 }}
        title={unclaimed ? `${coupon?.merchant.name}` : `${coupon?.name} | ${coupon?.merchant.name}`}
      >
        {coupon && <CouponPreview coupon={coupon} onClaim={() => setShowCouponClaimDialog(true)} />}
      </AppPage.Card>
    </AppPage>
  );
};

export default CouponDetails;
