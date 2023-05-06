import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  setCredentials,
  logOut,
  setUnauthorized,
  clearJWTAccount,
} from "features/auth/authSlice";
import { cookies } from "pages/_app";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api/v1",
  credentials: "include",
});

const baseQueryWithRedirect = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("err::", result?.error);
  if (
    result?.error?.status === 403 ||
    result?.error?.status === 401 ||
    result?.error?.originalStatus === 403 ||
    result?.error?.originalStatus === 401
  ) {
    api.dispatch(setUnauthorized(true));
    api.dispatch(clearJWTAccount());
  } else {
    api.dispatch(setUnauthorized(false));
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithRedirect,
  endpoints: (builder) => ({}),
});

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result?.error?.originalStatus === 403) {
//     const refreshResult = await baseQuery("/refresh", api, extraOptions);
//     if (refreshResult?.data) {
//       api.dispatch(setCredentials({ ...refreshResult.data }));
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }
//   return result;
// };
