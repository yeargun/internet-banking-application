import { apiSlice } from "utils/api/apiSlice";
export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccounts: builder.mutation({
      query: () => ({
        url: "/account/all",
        method: "GET",
      }),
    }),
    addAccount: builder.mutation({
      query: (accountDetails) => ({
        url: "/account",
        method: "POST",
        body: { ...accountDetails },
      }),
    }),
  }),
});

export const { useGetAllAccountsMutation, useAddAccountMutation } =
  accountApiSlice;
