import { apiSlice } from "utils/api/apiSlice";
export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccounts: builder.mutation({
      query: () => ({
        url: "/account/all",
        method: "GET",
      }),
    }),
    getAllCurrencies: builder.mutation({
      query: () => ({
        url: "/currency/all",
        method: "GET",
      }),
    }),

    createNewAccount: builder.mutation({
      query: (accountDetails) => ({
        url: "/account",
        method: "POST",
        body: { ...accountDetails },
      }),
    }),
  }),
});

export const {
  useGetAllCurrenciesMutation,
  useGetAllAccountsMutation,
  useCreateNewAccountMutation,
} = accountApiSlice;
