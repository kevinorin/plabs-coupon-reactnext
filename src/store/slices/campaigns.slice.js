import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Utilities
import { resetAppAction } from "../actions";
import { debugCampaigns } from "../data/campaigns.data";

// Types
// import { CampaignStatus, ICampaign } from "@typings/coupon.types";
import { RootState } from "../index";

export const campaignsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

////////////////////////////////////////////////////////////////////////////////
// Slice
////////////////////////////////////////////////////////////////////////////////

const initialState = campaignsAdapter.getInitialState();
// DEBUG: Load store with hardcoded values for now!
const debugInitialState = campaignsAdapter.upsertMany(initialState, debugCampaigns);

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState: debugInitialState,
  reducers: {
    addCampaign(state, action) {
      // TODO: Flesh out with more coupon details???
      campaignsAdapter.addOne(state, action.payload);
    },
    endCampaign(state, action) {
      campaignsAdapter.updateOne(state, {
        id: action.payload,
        changes: {
          status: "ended",
        },
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAppAction, (state) => {
      campaignsAdapter.removeAll(state);
    });
  },
});

////////////////////////////////////////////////////////////////////////////////
// Selectors
////////////////////////////////////////////////////////////////////////////////

export const campaignsSelectors = campaignsAdapter.getSelectors<RootState>((state) => state.campaigns);

export const selectCampaign = (state, id) => campaignsSelectors.selectById(state, id);

export const selectCampaigns = campaignsSelectors.selectAll;

/**
 * Select all campaigns of a provided status
 *
 * @param   state  - Store state
 * @param   status - Status filter
 * @returns Campaigns matching provided status
 */
// export const selectCampaignsByStatus = createSelector(
//   [campaignsSelectors.selectAll, (state, status) => status],
//   (allCampaigns, status) =>
//     allCampaigns.filter((c) => (Array.isArray(status) ? status.includes(c.status) : c.status === status))
// );

export const { addCampaign, endCampaign } = campaignsSlice.actions;

export default campaignsSlice.reducer;
