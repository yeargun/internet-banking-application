import { isUnauthorized } from "features/auth/authSlice";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { cookies } from "pages/_app";
import { useState } from "react";
import { useSelector } from "react-redux";

function Header() {
  const router = useRouter();
  const unauthorized = useSelector(isUnauthorized);

  console.log("is atm unauth?=", unauthorized);
  return (
    <>
      <div className={styles.headerWrapper}>
        <h4>Bank24 &quot;Banking made easy&quot; </h4>

        {unauthorized || unauthorized === undefined ? (
          <>
            <Link style={{ cursor: "pointer" }} href="/login">
              Login
            </Link>
            <Link style={{ cursor: "pointer" }} href="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link style={{ cursor: "pointer" }} href="/accounts">
              Accounts
            </Link>
            <Link style={{ cursor: "pointer" }} href="/transactions">
              Transaction History
            </Link>
            <Link style={{ cursor: "pointer" }} href="/sendMoney">
              Send Money
            </Link>
            <h4
              style={{ cursor: "pointer", userSelect: "none" }}
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("username");
                  cookies.remove("Authorization");
                }
                router.push("/login");
              }}
            >
              Logout
            </h4>
          </>
        )}
      </div>
      <hr style={{ margin: "0" }} />
    </>
  );
}

export default Header;
