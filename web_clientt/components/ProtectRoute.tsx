import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { isUnauthorized } from "features/auth/authSlice";
export const ProtectRoute = ({ children }: any) => {
  const router = useRouter();
  let username: string | null | undefined = undefined;
  if (typeof window !== "undefined") {
    username = localStorage.getItem("username");
  }
  const unauthorized = useSelector(isUnauthorized);

  console.log("unauth protect:", unauthorized);
  useEffect(() => {
    if (unauthorized && router) {
      if (router.pathname === "/login" || router.pathname === "/register")
        return;
      console.log("asfdad");
      router.push("/login");
    }
  }, [unauthorized, router]);
  // console.log(`tokn is this: ${token?.slice(0, 9)}`);

  return children;
};
