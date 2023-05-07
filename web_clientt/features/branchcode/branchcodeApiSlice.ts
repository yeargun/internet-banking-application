import { apiSlice } from "utils/api/apiSlice";

export const branchcodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBranchCodes: builder.mutation({
      query: () => ({
        url: "/auth/getAllBranchCodes",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBranchCodesMutation } = branchcodeApiSlice;
