import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accountNames: [],
    accountDetailsMap: {},
  },
  reducers: {
    // ####
    setAccountNames: (state, action) => {
      state.accountNames = action.payload.accountNames;
    },
  },
});

export const { setAccountNames } = accountSlice.actions;
export default accountSlice.reducer;

export const selectAccount = (state) => state.acount;
