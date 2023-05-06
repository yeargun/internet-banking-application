import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "components/Header";

import { store } from "utils/store";
import { Provider } from "react-redux";
import { ProtectRoute } from "components/ProtectRoute";
import Cookies from "universal-cookie";
export const cookies = new Cookies();
cookies.set("Access-Control-Allow-Credentials", true, { path: "/" });

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <ProtectRoute>
        <Header />
        <Component {...pageProps} />
      </ProtectRoute>
    </Provider>
  );
}
