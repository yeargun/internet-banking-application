import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    fromIBAN: undefined,
    toIBAN: undefined,
    amount: 0,
    description: undefined,
  },
  reducers: {
    // ####
    setTransactionDetails: (state, action) => {
      state.fromIBAN = action.payload.fromIBAN;
      state.toIBAN = action.payload.toIBAN;
      state.amount = action.payload.amount;
      state.description = action.payload.description;
    },
  },
});

export const { setTransactionDetails } = transactionSlice.actions;
export default transactionSlice.reducer;

export const selectTransaction = (state) => state.transaction;
