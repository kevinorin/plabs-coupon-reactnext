import { combineReducers } from "@reduxjs/toolkit";

// Utilities
import campaignsReducer from "./slices/campaigns.slice";
import couponsReducer from "./slices/coupons.slice";
import merchantReducer from "./slices/merchant.slice";
import userReducer from "./slices/user.slice";

const reducers = combineReducers({
  campaigns: campaignsReducer,
  coupons: couponsReducer,
  merchant: merchantReducer,
  user: userReducer,
});

export default reducers;
