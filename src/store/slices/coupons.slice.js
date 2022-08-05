import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Utilities
import { resetAppAction } from "../actions";
import { debugCoupons } from "../data/coupons.data";

// Types
// import { CouponStatus, ICoupon } from "@typings/coupon.types";
import { RootState } from "../index";

// export const couponsAdapter = createEntityAdapter({
//   sortComparer: (a, b) => a.name.localeCompare(b.name),
// });

////////////////////////////////////////////////////////////////////////////////
// Slice
////////////////////////////////////////////////////////////////////////////////

// const initialState = couponsAdapter.getInitialState();
// DEBUG: Load store with hardcoded values for now!
// const debugInitialState = couponsAdapter.upsertMany(initialState, debugCoupons);

// const couponsSlice = createSlice({
//   name: "coupons",
//   initialState: debugInitialState,
//   reducers: {
//     addCoupon(state, action) {
//       // TODO: Flesh out with more coupon details???
//       couponsAdapter.addOne(state, action.payload);
//     },
//     claimCoupon(state, action) {
//       couponsAdapter.updateOne(state, {
//         id: action.payload,
//         changes: {
//           status: "active",
//         },
//       });
//     },
//     removeCoupon(state, action) {
//       couponsAdapter.removeOne(state, action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(resetAppAction, (state) => {
//       couponsAdapter.removeAll(state);
//     });
//   },
// });

////////////////////////////////////////////////////////////////////////////////
// Selectors
////////////////////////////////////////////////////////////////////////////////

// export const couponsSelectors = couponsAdapter.getSelectors((state) => state.coupons);

// export const selectCoupon = (state, id) => couponsSelectors.selectById(state, id);

/**
 * Select all coupons (excluding hidden ones!)
 *
 * @returns Coupons matching provided status
 */
// export const selectCoupons = createSelector(couponsSelectors.selectAll, (coupons) =>
//   coupons.filter((c) => !c.hiddenAt)
// );

/**
 * Select all coupons of a provided status
 *
 * @param   state  - Store state
 * @param   status - Status filter
 * @returns Coupons matching provided status
 */
// export const selectCouponsByStatus = createSelector(
//   [couponsSelectors.selectAll, (state, status) => status],
//   (allCoupons, status) =>
//     allCoupons.filter((c) => (Array.isArray(status) ? status.includes(c.status) : c.status === status))
// );

// export const { claimCoupon } = couponsSlice.actions;

// export default couponsSlice.reducer;
