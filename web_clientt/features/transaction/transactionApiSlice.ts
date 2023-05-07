import { apiSlice } from "utils/api/apiSlice";
export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMoney: builder.mutation({
      query: (transactionDetails) => ({
        url: "/transaction",
        method: "POST",
        body: { ...transactionDetails },
      }),
    }),
    getAllTransactions: builder.mutation({
      query: () => ({
        url: "/transaction/all",
        method: "GET",
      }),
    }),
  }),
});

export const { useSendMoneyMutation, useGetAllTransactionsMutation } =
  transactionApiSlice;
