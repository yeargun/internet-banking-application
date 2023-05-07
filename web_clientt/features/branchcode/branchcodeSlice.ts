import { createSlice } from "@reduxjs/toolkit";
const branchcodeSlice = createSlice({
  name: "branchcode",
  initialState: {
    branchCodes: [],
  },
  reducers: {
    setBranchCodes: (state, action) => {
      console.log("action payload this", action.payload);
      state.branchCodes = action.payload;
    },
  },
});

export const { setBranchCodes } = branchcodeSlice.actions;
export default branchcodeSlice.reducer;
