import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Utilities
import { RootState } from "../index";
import { resetAppAction } from "../actions";

// Types
// import { IUser } from "@typings/user.types";

////////////////////////////////////////////////////////////////////////////////
// Slice
////////////////////////////////////////////////////////////////////////////////


const initialState = {
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Remove user profile
     *
     * @param state          - Redux user state slice
     */
    removeProfile: (state) => {
      state.profile = null;
    },
    /**
     * Update user profile (merges keys)
     *
     * @param state          - Redux user state slice
     * @param action.payload - User profile
     */
    setProfile: (state, action) => {
      if (!state.profile) {
        state.profile = action.payload;
        return;
      }

      // Limit profile updates to existing keys
      Object.keys(state.profile).forEach((key) => {
        const profileKey = key;
        const value = action.payload[profileKey];
        if (value === undefined) return;

        if (state.profile) {
          state.profile[profileKey] = value;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAppAction, (state) => {
      // TODO: Reset reset of store when hardcoded data is removed

      state.profile = null;
    });
  },
});

////////////////////////////////////////////////////////////////////////////////
// Selectors
////////////////////////////////////////////////////////////////////////////////

export const selectProfile = (state) => state.user.profile;

export const { removeProfile, setProfile } = userSlice.actions;

export default userSlice.reducer;
