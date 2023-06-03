import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cookies } from "pages/_app";

interface AuthState {
  unauthorized: boolean | undefined;
}

const initialState: AuthState = {
  unauthorized: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      console.log("token dd", token);
      state.unauthorized = false;
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
    setUnauthorized: (state, action: PayloadAction<boolean | undefined>) => {
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
