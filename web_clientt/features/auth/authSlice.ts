import { createSlice } from "@reduxjs/toolkit";
import { cookies } from "pages/_app";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    unauthorized: undefined,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      console.log("token dd", token);
      cookies.set("Authorization", `Bearer ${token}`, {
        sameSite: "strict",
        // this needed for prodution tho, https
        secure: true,
        path: "/",
        ////when enabled, I get error idk
        // httpOnly: true,
        // encode: (val) => val, //prevent url encode
      });
    },
    setUnauthorized: (state, action) => {
      console.log("action payload this", action.payload);
      state.unauthorized = action.payload;
    },
    logOut: (state, action) => {},
  },
});

export const { setCredentials, logOut, setUnauthorized } = authSlice.actions;
export default authSlice.reducer;
export const isUnauthorized = (state) => state.auth.unauthorized;

// export const selectCurrentUser = (state) => state.auth.username;
// export const selectCurrentToken = (state) => state.auth.token;
// export const selectCurrentUser = (state) => state.auth.username;
