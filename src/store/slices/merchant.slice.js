import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Utilities
import { StorageService } from "@services";
import { resetAppAction } from "../actions";
import { AppDispatch, RootState } from "../index";

////////////////////////////////////////////////////////////////////////////////
// Slice
////////////////////////////////////////////////////////////////////////////////


const initialState = {
  // merchant: null,
  merchant: {
    id: "fake",
    logoUrl: null,
    name: "Novajuice",
    website: null,
  },
  viewAsMerchant: false,
};

const merchantSlice = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    setupMerchantProfile: (state, action) => {
      // Only one merchant profile can be added at a time for an account
      if (state.merchant) return;

      state.merchant = action.payload;
    },
    setMerchantView: (state, action) => {
      state.viewAsMerchant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAppAction, (state) => {
      // TODO: Reset reset of store when hardcoded data is removed

      state.viewAsMerchant = false;
    });
  },
});

export const { setupMerchantProfile } = merchantSlice.actions;

////////////////////////////////////////////////////////////////////////////////
// Thunks
////////////////////////////////////////////////////////////////////////////////

/**
 * Toggle whether the user is viewing as merchant or customer
 *
 * @param viewAsMerchant - Whether the user is viewing as merchant
 */
export const toggleMerchantView = (viewAsMerchant) => (dispatch) => {
  dispatch(merchantSlice.actions.setMerchantView(viewAsMerchant));

  StorageService.setString(StorageService.keys.profileViewType, viewAsMerchant ? "merchant" : "customer");
};

////////////////////////////////////////////////////////////////////////////////
// Selectors
////////////////////////////////////////////////////////////////////////////////

/** Get the account merchant profile (if any) */
export const selectMerchantProfile = (state) => state.merchant.merchant;

/** Whether user is viewing app as a merchant */
export const selectViewingAsMerchant = (state) => Boolean(state.merchant.viewAsMerchant);

/** Get currently selected/viewed merchant profile (empty if viewing as customer) */
export const selectViewedMerchant = (state) =>
  state.merchant.viewAsMerchant ? state.merchant.merchant : null;

export default merchantSlice.reducer;
